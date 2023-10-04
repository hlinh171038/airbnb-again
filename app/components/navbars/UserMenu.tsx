"use client"

import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar'
import { useCallback, useEffect, useState } from 'react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { User } from '@prisma/client'
import useLoginModal from '@/app/hooks/useLoginModal'
import MenuItem from './MenuItem'
import {signOut} from 'next-auth/react'
import { SafeUser } from '@/app/types'
import { useRouter } from 'next/navigation'
import useRentModal from '@/app/hooks/useRentModal'

interface UserMenuProps {
    session?: SafeUser | null
}

const UserMenu:React.FC<UserMenuProps> = ({
    session
}) =>{

    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [bounch, setBounch] = useState(true);
    const router = useRouter();
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()

    const toggle = useCallback(()=>{
        setIsOpen((isOpen) => !isOpen)
    },[])

    const handleOpenRegisterModal = useCallback(()=>{
        registerModal.onOpen();
        toggle()
    },[registerModal,toggle])

    const handleOpenLoginModal =useCallback(()=>{
        loginModal.onOpen();
        toggle()
    },[loginModal,toggle])

    const handleOpenRentModal = useCallback(()=>{
        if(!session)
        {
            return loginModal.onOpen()
        }
        rentModal.onOpen()
    },[loginModal,rentModal,session])
    const handleFavorite = useCallback(()=>{
        setIsOpen(false)
        router.push('/favorites')
    },[router])

    // handle trips
    const handleTrips = useCallback(()=>{
        setIsOpen(false)
        router.push('/trips')
    },[router])

    // handle home
    const handleHome = useCallback(()=>{
        setIsOpen(false)
        router.push('/')
    },[router])

    // handle contact
    const handleContact = useCallback(()=>{
        setIsOpen(false)
        router.push('/contact?category=Khách')
    },[router])

    // handle contact
    const handleRent = useCallback(()=>{
        setIsOpen(false)
        router.push('/rent2')
    },[router])

    //handle information
    const handleInformation = useCallback(()=>{
        setIsOpen(false)
        router.push('/informations?category=thông%20tin%20cá%20nhân')
    },[router])


    return (
       <div 
       className='hidden md:flex flex-row justify-between items-center relative z-50'>
        <div 
         onClick={()=>router.push('/rent2')}
        className='mx-4 text-sm hover:bg-neutral-100 rounded-full px-4 py-1 transiton cursor-pointer hidden md:block'>
            Đón tiếp khách
            {/* {JSON.stringify(session)} */}
        </div>
        <div
            onClick={toggle}
            className='
                flex
                flex-row
                justify-between
                items-center
                ml-2
                hover:bg-neutral-100
                rounded-full
                hover:shadow-md
                px-4 
                py-1
                cursor-pointer
                transition
                border-[1px]
            '
        >
            <AiOutlineMenu />
            <div className='hidden sm:block'>
                <Avatar session={session}/>
            </div>
        </div>
       
            <div className={`
                    absolute 
                    transition-all 
                    top-12 
                    right-0 
                    bg-white 
                    border-[1px]
                    px-4 
                    
                    w-[300px] 
                    rounded-lg 
                    shadow-md
                    overflow-hidden
                    duration-100
                    ${isOpen ?"h-auto py-4 ":"h-0"}
                    ${isOpen ?"opacity-full":"opacity-0"}
                    `}>
                {session ? (
                    <>
                         <MenuItem
                            label='Trang chủ'
                            onClick={handleHome}
                        />
                        <MenuItem
                            label='Chuyến đi'
                            onClick={handleTrips}
                        />
                        <MenuItem
                            label='Danh sách yêu thích'
                            onClick={handleFavorite}
                        />
                        <MenuItem
                            label='Quản lí tài khoản'
                            onClick={handleInformation}
                        />
                        <MenuItem
                            label='Quản lí nhà/phòng cho thuê'
                            onClick={handleRent}
                        />
                        <MenuItem
                            label='Trung tâm trợ giúp'
                            onClick={handleContact}
                        />
                        <hr className='mb-2'/>
                        <MenuItem 
                                 onClick={() =>signOut()}
                                 label='Đăng Xuất'
                             />
                    </>
                ):(
                    <>
                        <MenuItem 
                            label='Login'
                            onClick={handleOpenLoginModal}
                        />
                         <MenuItem 
                            label='Sign up'
                            onClick={handleOpenRegisterModal}
                        />
                    </>
                )}
              
            </div>
       
       </div>
    )
}

export default UserMenu
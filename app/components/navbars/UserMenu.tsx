"use client"

import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar'
import { useCallback, useState } from 'react'
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
    },[])
    return (
       <div 
       className='flex flex-row justify-between items-center relative'>
        <div 
         onClick={handleOpenRentModal}
        className='mx-4 hover:bg-neutral-100 rounded-full px-4 py-1 transiton cursor-pointer hidden md:block'>
            Airbnb your home
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
        {isOpen && (
            <div className='absolute top-12 right-0 bg-white border-[1px] px-4 py-4 w-[200px] rounded-lg shadow-md'>
                {session ? (
                    <>
                        <MenuItem
                            label='My trips'
                            onClick={()=>{}}
                        />
                        <MenuItem
                            label='My favorites'
                            onClick={()=>{}}
                        />
                        <MenuItem
                            label='My reservations'
                            onClick={()=>{}}
                        />
                        <MenuItem
                            label='My properties'
                            onClick={()=>{}}
                        />
                        <MenuItem
                            label='Airbnb my house'
                            onClick={()=>{}}
                        />
                        <MenuItem 
                                 onClick={() =>signOut()}
                                 label='Logout'
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
        )}
       </div>
    )
}

export default UserMenu
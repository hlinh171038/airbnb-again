"use client"

import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar'
import { useCallback, useState } from 'react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { User } from '@prisma/client'

interface UserMenuProps {
    session?: User | null
}

const UserMenu:React.FC<UserMenuProps> = ({
    session
}) =>{

    const [isOpen,setIsOpen] = useState<boolean>(false);
    const registerModal = useRegisterModal()

    const toggle = useCallback(()=>{
        setIsOpen((isOpen) => !isOpen)
    },[])

    const handleOpenRegisterModal = useCallback(()=>{
        registerModal.onOpen();
        toggle()
    },[registerModal])
    return (
       <div className='flex flex-row justify-between items-center relative'>
        <div className='mx-4 hover:bg-neutral-100 rounded-full px-4 py-1 transiton cursor-pointer hidden md:block'>
            Airbnb your home
            {JSON.stringify(session)}
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
                <Avatar />
            </div>
        </div>
        {isOpen && (
            <div className='absolute top-12 right-0 bg-white border-[1px] px-4 py-4 w-[200px] rounded-lg shadow-md'>
               <div className='hover:text-neutral-900 text-neutral-600 cursor-pointer hover:font-semibold transition'>
                    Login
                </div>
                <div 
                onClick={handleOpenRegisterModal}
                className='hover:text-neutral-900 text-neutral-600 cursor-pointer hover:font-semibold transition'>
                    Register
                </div>
            </div>
        )}
       </div>
    )
}

export default UserMenu
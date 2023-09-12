"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import Logo from "./Logo"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"
import {useState,useCallback} from 'react'
import { useRouter } from "next/navigation"
import { SafeUser } from "@/app/types"
import { toast } from "react-hot-toast"
import Image from "next/image"

interface NavbarRentProps {
    session?: SafeUser | null
}

const NavbarRent:React.FC<NavbarRentProps> = ({
    session
}) =>{
    const [bounch, setBounch] = useState(false);
    const rentModal = useRentModal();
    const router = useRouter()

    // handle manager
    const handleManager = useCallback(()=>{
        if(session){
            router.push('/rentmanager')
        }else {
            toast.error('Bạn chưa đăng nhập.')
            return;
        }
        
    },[router, toast,session])

    const handleBenefits = useCallback(()=>{
        if(session){
            router.push('/benefits')
        }else {
            toast.error('Bạn chưa đăng nhập.')
            return;
        }
        
    },[router,toast,session])

    if(typeof  window !== undefined){
        window.addEventListener('scroll',()=>{
            setBounch(window.scrollY > 100)
        });
    }
   
    return (
      
         <div 
            id="rentNav" 
            className={`
                fixed  
                flex flex-row 
                justify-between 
                items-center 
                py-2 
                px-2
                pr-4 
                bg-white 
                w-full
                transition
                duration-[300ms]
                z-30
                ${bounch ?"shadow-md":"shadow-none"}
            `}>
                {/* logo */}
               <div>
                <Image
                    onClick={()=>router.push('/')}
                    src="/logo.webp"
                    width={70}
                    height={70}
                    alt="logo"
                />
               </div>
               <div className="flex items-center gap-4">
                    <div  
                        onClick={handleManager}
                        className="text-sm hover:opacity-[.8] cursor-pointer"
                    >
                        Quản lí phòng
                    </div>
                    <div 
                        className="text-sm hover:opacity-[.8] cursor-pointer"
                        onClick={handleBenefits}
                    >
                        Doanh thu
                    </div>
                    <div 
                        onClick={()=>router.push('/contact')}
                        className="text-sm hover:opacity-[.8] cursor-pointer"
                    >
                        Hổ trợ
                    </div>
               </div>
               <div className=" flex-row items-center justify-end hidden sm:flex">
                <span className="text-sm text-muted text-semibold mr-3">Are you ready for rent ?</span>
                    <div className=" min-w-[200px] ">
                    <Button 
                        label="Airbnb Setup"
                        onClick={rentModal.onOpen}
                        icon={MdOutlineAddHomeWork}
                    /> 
                    </div>
               </div>
               
            
       </div>
    )
}

export default NavbarRent
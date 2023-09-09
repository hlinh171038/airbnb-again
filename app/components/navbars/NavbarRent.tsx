"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import Logo from "./Logo"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"
import {useState} from 'react'
import { useRouter } from "next/navigation"

const NavbarRent = () =>{
    const [bounch, setBounch] = useState(false);
    const rentModal = useRentModal();
    const router = useRouter()

    
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
                bg-white 
                w-full
                transition
                duration-[300ms]
                z-30
                ${bounch ?"shadow-md":"shadow-none"}
            `}>
               <Logo />
               <div className="flex items-center gap-4">
                    <div  
                        onClick={()=>router.push('/rentmanager')}
                        className="text-sm hover:opacity-[.8] cursor-pointer"
                    >
                        Quản lí phòng
                    </div>
                    <div 
                        className="text-sm hover:opacity-[.8] cursor-pointer"
                        onClick={()=>router.push('/benefits')}
                    >
                        Doanh thu
                    </div>
                    <div className="text-sm hover:opacity-[.8] cursor-pointer">Hổ trợ</div>
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
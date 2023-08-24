"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import Logo from "./Logo"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"
import {useState} from 'react'

const NavbarRent = () =>{
    const rentModal = useRentModal();
    const [bounch, setBounch] = useState(false);

    window.addEventListener('scroll',()=>{
        setBounch(window.scrollY > 100)
    });
    
   
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
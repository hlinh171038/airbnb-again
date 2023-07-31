"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import Logo from "./Logo"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"

const NavbarRent = () =>{
    const rentModal = useRentModal()
    return (
       <Container>
         <div className="flex flex-row justify-between items-center py-2 ">
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
       </Container>
    )
}

export default NavbarRent
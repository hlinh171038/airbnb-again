"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"

const NavMobile = () =>{
    const rentModal = useRentModal()
    return (
        <div className=" bottom-1 fixed w-full bg-white z-40 py-4 sm:hidden">
          <Container>
            <div className="text-center font-bold mb-2">Are you ready for rent ?</div>
            <Button 
                    label="Airbnb Setup"
                    onClick={rentModal.onOpen}
                    icon={MdOutlineAddHomeWork}
                />
          </Container>              
        </div>
    )
}

export default NavMobile
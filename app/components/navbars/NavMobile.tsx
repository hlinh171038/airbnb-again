"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"
import { useParams, usePathname } from "next/navigation"
import NavbarListingId from "./NavbarListingId"

const NavMobile = () =>{
    const rentModal = useRentModal()
    const path = usePathname();
    const params = useParams();
    console.log(params)
    console.log(path)

    if(path === `/listings/${params.listingId}`)
    {
      return <NavbarListingId />
    }
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
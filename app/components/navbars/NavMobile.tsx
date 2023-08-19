"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"
import { useParams, usePathname } from "next/navigation"
import NavbarListingId from "./NavbarListingId"
import { SafeListing } from "@/app/types"
import { Listing } from "@prisma/client"


interface NavMobileProps {
  listingData: Listing[]
}
const NavMobile:React.FC<NavMobileProps> = ({
  listingData = []
}) =>{
    const rentModal = useRentModal()
    const path = usePathname();
    const params = useParams();

    if(path === `/listings/${params.listingId}`)
    {
      return <NavbarListingId 
                listingData = {listingData}
                id={params.listingId as string} 
              />
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
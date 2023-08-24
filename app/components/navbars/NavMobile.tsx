"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"
import { useParams, usePathname } from "next/navigation"
import NavbarListingId from "./NavbarListingId"
import { SafeListing } from "@/app/types"
import { Listing } from "@prisma/client"
import {useEffect, useState} from 'react'


interface NavMobileProps {
  listingData: Listing[]
}
const NavMobile:React.FC<NavMobileProps> = ({
  listingData = []
}) =>{
    const rentModal = useRentModal()
    const path = usePathname();
    const params = useParams();
    const [bounch, setBounch] = useState(true);

    if(path === `/listings/${params.listingId}`)
    {
      return <NavbarListingId 
                listingData = {listingData}
                id={params.listingId as string} 
              />
    }
  //   window.addEventListener('scroll',()=>{
  //     console.log(bounch)
  //    
  // });
    useEffect(()=>{
      window.addEventListener('scroll',()=>{
        setBounch(window.scrollY > 100)
      })
    })
    return (
        <div className={`
          bottom-0
          fixed w-full 
          bg-white 
          z-40 
          py-4 
          sm:hidden 
          transition-all
          duration-[300ms]
          border-t-[1px]
          ${bounch ?"translate-y-0":"translate-y-full"}
          ${bounch ?"opacity-1":"opacity-0"}
        `}>
          <Container>
            <div className="text-center font-bold mb-2">Sẵn sàng cho thuê ?</div>
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
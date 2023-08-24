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
import NavbarMobileRent from "./NavbarMobileRent"
import { Abel } from "next/font/google"
import { IoSearch } from "react-icons/io5"
import { AiOutlineHeart } from "react-icons/ai"
import { BiMessage } from "react-icons/bi"
import { FaAirbnb } from "react-icons/fa"
import { RxAvatar } from "react-icons/rx"


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
    
    // menu mobile rent
    if(path === `/rent`)
    {
      return <NavbarMobileRent/>
    }
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
          py-2 
          sm:hidden 
          transition-all
          duration-[300ms]
          border-t-[1px]
          ${bounch ?"translate-y-0":"translate-y-full"}
          ${bounch ?"opacity-1":"opacity-0"}
        `}>
          <Container>
            <div className="flex justify-between items-center text-[.6rem] font-light">
              <div className="flex flex-col justify-center items-center cursor-pointer ">
                <div><IoSearch  size={30} className="text-neutral-400 hover:text-neutral-500 transition-all"/></div>
                <div>Khám phá</div>
              </div>
              <div className="flex flex-col justify-center items-center cursor-pointer ">
                <div><FaAirbnb  size={30} className="text-neutral-400 hover:text-neutral-500 transition-all"/></div>
                <div>Chuyến đi</div>
              </div>
              <div className="flex flex-col justify-center items-center cursor-pointer ">
                <div><AiOutlineHeart  size={30} className="text-neutral-400 hover:text-neutral-500 transition-all"/></div>
                <div>Yêu thích</div>
              </div>
              <div className="flex flex-col justify-center items-center cursor-pointer ">
                <div><BiMessage  size={30} className="text-neutral-400 hover:text-neutral-500 transition-all"/></div>
                <div>Liên hệ</div>
              </div>
              <div className="flex flex-col justify-center items-center cursor-pointer ">
                <div><RxAvatar  size={30} className="text-neutral-400 hover:text-neutral-500 transition-all"/></div>
                <div>Hồ sơ</div>
              </div>
            </div>
          </Container>              
        </div>
    )
}

export default NavMobile
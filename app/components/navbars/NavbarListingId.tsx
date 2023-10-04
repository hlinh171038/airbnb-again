"use client"

import { MdOutlineAddHomeWork } from "react-icons/md"
import Button from "../Button"
import Container from "../Container"
import { Listing } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { set } from "date-fns"
import useBook from "@/app/hooks/useBook"
import { BiLoaderAlt } from "react-icons/bi"
import LazyLoad from 'react-lazy-load';

// interface NavbarListingProps {
//   listingData: Listing[];
//   id: string
// }
const NavbarListingId = ({
  
}) =>{
    const bookModal = useBook()
    const [bounch, setBounch] = useState(true);


    if (typeof window !== "undefined") {
      // Client-side-only code
      window.addEventListener('scroll',()=>{
        setBounch(window.scrollY > 100)
      })
    }

    // handle open book
    const handleOpenBook =useCallback(()=>{
      bookModal.onOpen()
    },[bookModal])


    return <div 
    className={`
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
      `}
        >
      <Button 
        label="Đặt Phòng"
        onClick={handleOpenBook}
      />
      
  </div>
}

export default NavbarListingId
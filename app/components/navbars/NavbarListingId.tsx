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

interface NavbarListingProps {
  listingData: Listing[];
  id: string
}
const NavbarListingId:React.FC<NavbarListingProps> = ({
  listingData = [],
  id
}) =>{
    const bookModal = useBook()
    const [price,setPrice] = useState(0);
    const [date, setDate] = useState('')


    // handle open book
   
    const handleOpenBook =useCallback(()=>{
      bookModal.onOpen()
    },[bookModal.onOpen])

    const findData = useCallback((id:string)=>{
      return listingData.find((item)=>item.id === id)
    },[id,listingData]);

    useEffect(()=>{
      let data = findData(id);
      if(data)
      {
        setPrice(data.price)
        setDate(data.night)
      }
    },[])
    return <div className=" bottom-0 fixed w-full bg-white z-40 py-2 sm:hidden grid border-t-[1px] px-4 items-center" style={{gridTemplateColumns: "auto auto auto auto"}}>
      
      <div className=" animate-pulse font-light mb-2 text-sm " style={{gridArea:"1 / 1 / span 1 / span 3"}}>
        <div>
          <span className="font-bold">{price ? price.toLocaleString('vi', {style : 'currency', currency : 'VND'}):"Cập nhật"}</span> / Đêm
        </div>
        <div className="flex items-center text-sm underline">
          <div>
            {date ? new Date().getDate(): "..."} -
          </div>
          <div>
            {date && new Date(date).getDate()} thg
            {date && new Date(date).getMonth()} -
            {date && new Date(date).getFullYear()}
          </div>
        </div>
      </div>
      
      {!price || !date ?
      (
        <BiLoaderAlt size={50} className="animate-spin text-rose-600"/>
      
      ):
      (
          <Button
          label="Đặt phòng"
          onClick={handleOpenBook}
      />  
      )
      
      }          
  </div>
}

export default NavbarListingId
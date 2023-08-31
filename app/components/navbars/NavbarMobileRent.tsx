"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import Container from "../Container"
import { MdOutlineAddHomeWork } from "react-icons/md"
import {useState,useEffect} from 'react'

const NavbarMobileRent =() =>{
    const [bounch, setBounch] = useState(true);

    const rentModal = useRentModal()
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
          setBounch(window.scrollY > 100)
        })
      },[])
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

export default NavbarMobileRent
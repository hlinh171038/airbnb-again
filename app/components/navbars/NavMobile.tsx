"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Button from "../Button"
import {MdOutlineAddHomeWork} from 'react-icons/md'
import Container from "../Container"
import { useParams, usePathname, useRouter } from "next/navigation"
import NavbarListingId from "./NavbarListingId"
import { SafeListing, SafeUser } from "@/app/types"
import { Listing } from "@prisma/client"
import {useEffect, useState,useCallback} from 'react'
import NavbarMobileRent from "./NavbarMobileRent"
import { Abel } from "next/font/google"
import { IoSearch } from "react-icons/io5"
import { AiOutlineHeart } from "react-icons/ai"
import { BiMessage } from "react-icons/bi"
import { FaAirbnb } from "react-icons/fa"
import { RxAvatar } from "react-icons/rx"
import { GoHome } from "react-icons/go"
import toast from "react-hot-toast"
import useLoginModal from "@/app/hooks/useLoginModal"


interface NavMobileProps {
  session: SafeUser | null
}


const NavMobile:React.FC<NavMobileProps> = ({
  session
}) =>{
    const [bounch, setBounch] = useState(true);
    const loginModal = useLoginModal();
    const router = useRouter();
    const path = usePathname();
    const params = useParams();
    

    if(path === `/listings/${params.listingId}`)
    {
      return <NavbarListingId 
   
              />
    }
    
    // menu mobile rent
    if(path === `/rent2`)
    {
      return <NavbarMobileRent/>
    }
 

    // useEffect(()=>{
   
    // },[])
    if (typeof window !== "undefined") {
      // Client-side-only code
      window.addEventListener('scroll',()=>{
        setBounch(window.scrollY > 100)
      })
    }

    // handle navigate trips
    const handleNavigateTrips =()=>{
      if(!session){
        loginModal.onOpen()
        router.push('/')
      }else {
        router.push('/trips')
      }

    }

    //handle navigate favorite
    const handleNavigateFavorite =()=>{
      if(!session){
        loginModal.onOpen()
        router.push('/')
      }else {
        router.push('/favorites')
      }

    }

    //handle navigate contact
    const handleNavigateContact =()=>{
      if(!session){
        loginModal.onOpen()
        router.push('/')
      }else {
        router.push('/contact?category=Khách')
      }

    }
    //handle navigate information
    const handleNavigateInformation =()=>{
     
        router.push('/profiles')

    }
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
            <div 
              className={`flex justify-between items-center text-[.6rem] font-light`}>
            
              <div 
                onClick={()=>router.push('/')}
                className={`flex flex-col justify-center items-center cursor-pointer ${path === '/' && "text-rose-500"}`}
                >
                <div><GoHome  size={30} className={`text-neutral-400 hover:text-neutral-500 transition-all ${path === '/' && "text-rose-500 hover:text-rose-600"}`}/></div>
                <div>Trang chủ</div>
              </div>
              <div 
                onClick={handleNavigateTrips}
                className={`flex flex-col justify-center items-center cursor-pointer ${path === '/trips' && "text-rose-500"}`}
                >
                <div><FaAirbnb  size={30} className={`text-neutral-400 hover:text-neutral-500 transition-all ${path === '/trips' && "text-rose-500 hover:text-rose-600"} `}/></div>
                <div>Chuyến đi</div>
              </div>
              <div 
                onClick={handleNavigateFavorite}
                className={`flex flex-col justify-center items-center cursor-pointer ${path === '/favorites' && "text-rose-500"}`}
                >
                <div><AiOutlineHeart  size={30} className={`text-neutral-400 hover:text-neutral-500 transition-all ${path === '/favorites' && "text-rose-500 hover:text-rose-600"} `}/></div>
                <div>Yêu thích</div>
              </div>
              <div 
                onClick={handleNavigateContact}
                className={`flex flex-col justify-center items-center cursor-pointer ${path === '/contact' && "text-rose-500"}`}
                >
                <div><BiMessage  size={30}className={`text-neutral-400 hover:text-neutral-500 transition-all ${path === '/contact' && "text-rose-500 hover:text-rose-600"} `}/></div>
                <div>Liên hệ</div>
              </div>
              <div 
                onClick={handleNavigateInformation}
                className={`flex flex-col justify-center items-center cursor-pointer ${path === '/profiles' && "text-rose-500"}`}
                >
                <div><RxAvatar  size={30} className={`text-neutral-400 hover:text-neutral-500 transition-all ${path === '/profiles' && "text-rose-500 hover:text-rose-600"} `}/></div>
                <div>Hồ sơ</div>
              </div>
            </div>
          </Container>              
        </div>
    )
}

export default NavMobile
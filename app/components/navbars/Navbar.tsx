"use client"


import { SafeUser } from "@/app/types"
import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import Categories from "./Categories"
import { useParams, usePathname } from "next/navigation"
import Header from "../Header"
import Button from "../Button"
import NavbarRent from "./NavbarRent"
import { useCallback, useEffect, useState } from "react"
import NavbarListingId from "./NavbarListingId"


interface NavbarProps {
    session?: SafeUser | null 
}

const Navbar:React.FC<NavbarProps> = ({
    session
}) =>{
    const path = usePathname();
    const params = useParams();
    // console.log(params.listingId) // take id of link

    if(path === '/rent')
    {
        return <NavbarRent />
    }
  
    // const [scrollY, setScrollY] = useState(0);
    // const navbar = document.getElementById('navbars');
    
    // const onScroll = useCallback(() => {
    //     console.log(document.body.getBoundingClientRect().top);
    //     const pageY = document.body.getBoundingClientRect().top;

    //     console.log(navbar?.getBoundingClientRect().bottom)

    //     //console.log(pageY)
    // }, []);
    // useEffect(() => {
    //     window.addEventListener("scroll", onScroll);
    //   });

    return (
        <div
            id="navbars"
            className="
                fixed
                w-full 
                bg-white 
                z-10 
                shadow -sm
            "
        >
            <div className="
            py-2
            border-b-[1px]
            ">
                <Container >
                    <div
                        className="
                            flex
                            flex-row
                            justify-between
                            items-center
                        "
                    >
                        <Logo />
                        <Search />
                        <UserMenu session={session}/>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}

export default Navbar
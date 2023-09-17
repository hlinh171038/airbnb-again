"use client"

import Image from "next/image"
import Container from "../Container"
import { useRouter } from "next/navigation"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import Categories from "./Categories"
import { SafeUser } from "@/app/types"

interface NavbarLIDProps {
    session ?:SafeUser | null
}

const NavbarLID:React.FC<NavbarLIDProps> = ({
    session
})=>{
    const router = useRouter()
    return (
        <div
        id="navbars"
        className="
            fixed
            w-full 
            bg-white 
            z-50
            shadow -sm
        "
    >
        <div className="
        py-2
        boder-none
        md:border-b-[1px]
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
                     <Image 
                        className=" cursor-pointer"
                        onClick={()=>router.push('/')}
                        src="/logo.webp"
                        alt="Avatar"
                        width={80}
                        height={80}
                    />
                    <Search 
                        listingId
                    />
                    <UserMenu session={session}/>
                </div>
            </Container>
        </div>
        <Categories />
    </div>
    )
}

export default NavbarLID
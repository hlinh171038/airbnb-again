"use client"

import Image from "next/image"
import Container from "../Container"
import { useRouter } from "next/navigation"

const NavbarContact = ()=>{
    const router = useRouter()
    return (
        <Container>
            <div className="flex gap-4 my-6 fixed top-[-27px] left-0 z-60 bg-white w-full px-4 py-6 z-50 shadow-md">
                <Image
                    onClick={()=>router.push('/')}
                    src="/logo.webp"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="cursor-pointer"
                />
                <div className="font-bold text-sm text-end cursor-pointer w-full" onClick={()=>router.push('/contact')}>Trung tâm trợ giúp</div>
            </div>
        </Container>
    )
}

export default NavbarContact
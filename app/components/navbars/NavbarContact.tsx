"use client"

import Image from "next/image"
import Container from "../Container"
import { useRouter } from "next/navigation"

const NavbarContact = ()=>{
    const router = useRouter()
    return (
        <Container>
            <div className="flex gap-4 my-6 fixed top-[-27px] left-0 z-60 bg-white w-full px-4 py-6">
                <Image
                    onClick={()=>router.push('/')}
                    src="/logo.png"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="cursor-pointer"
                />
                <div className="font-bold text-sm cursor-pointer" onClick={()=>router.push('/contact')}>Trung tâm trợ giúp</div>
            </div>
        </Container>
    )
}

export default NavbarContact
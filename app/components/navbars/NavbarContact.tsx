"use client"

import Image from "next/image"
import Container from "../Container"

const NavbarContact = ()=>{
    return (
        <Container>
            <div className="flex gap-4 my-6">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="cursor-pointer"
                />
                <div className="font-bold text-sm">Trung tâm trợ giúp</div>
            </div>
        </Container>
    )
}

export default NavbarContact
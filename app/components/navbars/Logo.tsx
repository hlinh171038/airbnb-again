"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo =() =>{
    const router = useRouter();
    return (
        <Image 
            className="hidden md:block cursor-pointer"
            onClick={()=>router.push('/')}
            src="/logo.webp"
            alt="Avatar"
            width={80}
            height={80}
        />
    )
}

export default Logo
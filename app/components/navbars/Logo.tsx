"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo =() =>{
    const router = useRouter();
    return (
        <Image 
            className="hidden sm:block"
            onClick={()=>router.push('/')}
            src="/logo.png"
            alt="Avater"
            width={80}
            height={80}
        />
    )
}

export default Logo
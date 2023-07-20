"use client"

import Image from "next/image"

const Avatar =() =>{
    return (
        <Image
            src="/placeholder.jpg"
            alt="Avatar"
            width={30}
            height={30}
            className="rounded-full ml-2"
        />
    )
}

export default Avatar
"use client"

import { SafeUser } from "@/app/types"
import Image from "next/image"


interface AvatarProps {
    session?: SafeUser | null;
}
const Avatar:React.FC<AvatarProps> =({
    session
}) =>{
    return (
        <Image
            src={session ? session?.image as string : "/placeholder.webp"}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full ml-2"
        />
    )
}

export default Avatar
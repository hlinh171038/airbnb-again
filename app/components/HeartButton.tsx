"use client"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";


interface HeartButtonProps {
    listingId: string;
    currentUser: SafeUser | null
}
const HeartButton:React.FC<HeartButtonProps>=({
    listingId,
    currentUser
}) =>{
    const hasFavorited = false;
    return (
        <div
            className="
                relative
                hover:opacity-50
                transition
                cursor-pointer
            "
        >
            <AiFillHeart 
                size={24}
                className={
                    hasFavorited ?'fill-rose-500' : 'fill-neutral-500/70'
                }
            />
        </div>
    )
}

export default HeartButton
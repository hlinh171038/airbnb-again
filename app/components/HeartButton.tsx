"use client"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorites from "../hooks/useFavorites";


interface HeartButtonProps {
    listingId: string;
    currentUser: SafeUser | null
}
const HeartButton:React.FC<HeartButtonProps>=({
    listingId,
    currentUser
}) =>{
    const {hasFavorite,toggleFavorite} = useFavorites({listingId,currentUser})
    return (
        <div
            onClick={toggleFavorite}
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
                    hasFavorite ?'fill-rose-500' : 'fill-neutral-500/70'
                }
            />
        </div>
    )
}

export default HeartButton
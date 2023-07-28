import { SafeUser } from "../types";
import {useMemo,useCallback} from "react"
import useLoginModal from "./useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FavoriteProps {
    listingId: string;
    currentUser: SafeUser | null
}
const useFavorites =({
    listingId,
    currentUser
}:FavoriteProps)=>{
    const loginModal = useLoginModal()
    const router = useRouter()
    // check if
    const hasFavorite = useMemo(()=>{
        //take current favoriteIds 
        const currentFavorited = currentUser?.favoriteIds || []
        //chack has id in here
       return currentFavorited.includes(listingId);
    },[currentUser, listingId]);

    const  toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        // check current user
        if(!currentUser){
            return loginModal.onOpen()
        }
        //if hasFAvorite true --> delete else -->update
        try {
            let request;

            if(hasFavorite)
            {
                console.log('true');
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }else {
                console.log('false');
                request = () => axios.post(`/api/favorites/${listingId}`)
            } 
            
            await request();
            toast.success("Successed!");
            router.refresh();
        } catch (error) {
            toast.error("Some thing went wrong")
        }

    },[currentUser, hasFavorite,router,loginModal])

    return {
        toggleFavorite,
        hasFavorite
    }
}

export default useFavorites
"use client"

import { SafeUser } from "@/app/types";
import Header from "../Header";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc : string;
    locationValue: string;
    id: string;
    currentUser: SafeUser | null
}
const ListingHead:React.FC<ListingHeadProps> =({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) =>{

    const {getByValue} = useCountries();

    const location = getByValue(locationValue);
    return (
       
        <>
            <Header 
                title={title}
                subtitle={`${location?.region} - ${location?.label}`}
            />
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-auto
                    rounded-xl
                    relative
                "
            >
                <Image 
                    src={imageSrc}
                    
                    alt="Listing"
                    fill
                    className="object-cover w-full"
                />
               <div
                className="absolute top-3 right-3"
               >
                <HeartButton 
                        listingId={id}
                        currentUser={currentUser}
                        
                    />
               </div>
            </div>
        </>
    )
}

export default ListingHead
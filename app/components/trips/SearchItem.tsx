"use client"

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, safeReservation } from "@/app/types"
import { useCallback } from "react";

interface SearchItemProps {
    data: SafeListing | null;
    reservation: safeReservation | null;
    handleValue:(value:any) =>void;
}
const SearchItem:React.FC<SearchItemProps> = ({
    data,
    reservation,
    handleValue
}) =>{
    const {getByValue} = useCountries();
    const location = getByValue(data?.locationValue as string)

    return (
        <div className="cursor-pointer text-neutral-600  " onClick={()=>handleValue(data?.locationValue as any)}>
            {location?.label}
        </div>
    )
}

export default SearchItem
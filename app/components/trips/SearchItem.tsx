"use client"

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, safeReservation } from "@/app/types"

interface SearchItemProps {
    data: SafeListing | null;
    reservation: safeReservation | null
}
const SearchItem:React.FC<SearchItemProps> = ({
    data,
    reservation
}) =>{
    const {getByValue} = useCountries();
    const location = getByValue(data?.locationValue as string)
    return (
        <div>{location?.label}</div>
    )
}

export default SearchItem
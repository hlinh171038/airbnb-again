"use client"

import useCountries from "@/app/hooks/useCountries"
import { safeReservation } from "@/app/types"
import SearchItem from "./SearchItem"
import {useMemo} from "react"

interface TripsSearchProps {
    reservations:safeReservation[]
}
const TripsSearch:React.FC<TripsSearchProps> = ({
    reservations =[]
}) =>{
    const {getByValue} = useCountries();
    const fillterReservations = useMemo(() => {
        let filter:any[]= [];
        reservations.forEach((item)=>{
            // if(filter.includes(item.listing.locationValue))
            // {
            //     filter.push(item);
            // }
            if(filter.length <=0){
                filter.push(item);
            }
           let find =  filter?.find(it =>it.listing.locationValue ===item.listing.locationValue);
           if(!find){
            filter.push(item)
           }
        })
        return filter
    }, [reservations]);
  
    return (
        <div>
            <div className="text-xl font-bold">Danh sách của bạn</div>
            {fillterReservations.reverse().map((reservation)=>{
                return <SearchItem
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                        />
            })}
        </div>
    )
}

export default TripsSearch
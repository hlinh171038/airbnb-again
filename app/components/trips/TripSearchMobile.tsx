"use client"

import useCountries from "@/app/hooks/useCountries"
import { safeReservation } from "@/app/types"
import SearchItem from "./SearchItem"
import {useMemo} from "react"

interface TripsSearchProps {
    reservations:safeReservation[];
    handleValue: (value: any) =>void;
    openSidebar?:boolean;
}
const TripsSearchMobile:React.FC<TripsSearchProps> = ({
    reservations =[],
    handleValue,
    openSidebar
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
        <div  className={`${openSidebar ?"block": "hidden"}`}>
            <div className="text-xl font-bold">Danh sách của bạn</div>
            <div onClick={()=>handleValue('all')} className="cursor-pointer text-neutral-600">Tất cả chuyến đi </div>
            {fillterReservations.reverse().map((reservation)=>{
                return <SearchItem
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            handleValue = {handleValue}
                        />
            })}
        </div>
    )
}

export default TripsSearchMobile
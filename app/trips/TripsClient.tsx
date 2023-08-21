"use client"

import { BiDownArrow } from "react-icons/bi"
import Container from "../components/Container"
import Header from "../components/Header"
import Tag from "../components/Tag"
import ListingCard from "../components/listings/ListingCard"
import TripsCard from "../components/trips/TripsCard"
import TripsSearch from "../components/trips/TripsSearch"
import { SafeUser, safeReservation } from "../types"
import {useCallback, useMemo, useState} from 'react'

interface TripsClientProps {
    currentUser: SafeUser | null
    reservations: safeReservation[]
}
const select =[
    "mới nhất", "cũ nhất", "giá"
]
const TripsClient:React.FC<TripsClientProps> = ({
    currentUser,
    reservations =[]
}) =>{
    const [selectValue,setSelectValue] = useState('mới nhất');
    const [toggle,setToggle] = useState(false);

    const handleSelect = useCallback((item:string)=>{
        setSelectValue(item);
        setToggle(false);
    },[selectValue]);

    // handle toogle selected
    const handleToggleSelect = useCallback(()=>{
        setToggle(!toggle);
    },[toggle]);

    // reservation
    const updateReservatrion = useMemo(()=>{
        let arr;
        if(selectValue === 'cũ nhất')
        {
            arr = reservations.sort((a,b)=>{
                if(a.createdAt >b.createdAt) return 1;
                if(a.createdAt <b.createdAt) return -1;
                return 0;
            })
        }else if(selectValue === 'mới nhất'){
            arr = reservations.sort((a,b)=>{
                if(a.createdAt >b.createdAt) return -1;
                if(a.createdAt <b.createdAt) return 1;
                return 0;
            })
        }else {
            arr = reservations.sort((a,b)=>{
                if(a.totalPrice >b.totalPrice) return -1;
                if(a.createdAt <b.createdAt) return 1;
                return 0;
            })
        }
        return arr
    },[selectValue]);
    
    return (
       <Container>
        <Tag
            tag1="Trip Listing"
        />
        <Header 
            title="Danh sách chuyến đi "
            subtitle="Nơi bạn đang đến, nơi bạn đang đi "
            big
        />
        <div
            className="
                grid
                grid-cols-2
                mt-8
            "
            style={{gridTemplateColumns: "auto auto auto auto"}}
        >
            <div>
                <TripsSearch 
                    reservations ={reservations}
                />
            </div>
            <div style={{gridArea:"1/ 2 / span 2 / span 3"}}>
                <div className="flex justify-end px-4  relative py-4 transition-all cursor-pointer">
                   
                       <div className=" absolute top-0 right-0 border-b-[1px] border-rose-500 w-[200px] capitalize hover:shadow-lg" onClick={handleToggleSelect}>{selectValue}</div>
                       <BiDownArrow className="absolute top-[0.5rem] right-0" size={10} onClick={handleToggleSelect}/>
                            <div className={`absolute top-7 right-0 bg-neutral-100 w-[200px] px-2 py-2 ${toggle ?"block": "hidden"}`} >
                                {select.map((item: string) =>{
                                    return <div onClick={()=>handleSelect(item)} className={`capitalize hover:bg-neutral-200    `}>{item}</div>
                                })}
                            </div>
                       </div>
                <div
                    className="
                    "
                >
                    {updateReservatrion.map((reservation) =>{
                        return <TripsCard 
                                    key={reservation.id}
                                    currentUser={currentUser}
                                    data ={reservation.listing}
                                    reservation ={reservation}
                                 />
                    })}
                </div>
            </div>
        </div>
       </Container>
    )
}

export default TripsClient
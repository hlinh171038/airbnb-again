"use client"

import useCountries from "@/app/hooks/useCountries"
import { SafeListing, SafeUser, safeReservation } from "@/app/types"
import Image from "next/image"
import { BiTimeFive } from "react-icons/bi"
import { MdPlace } from "react-icons/md"
import Button from "../Button"
import { useCallback,useState } from "react"
import { useRouter } from "next/navigation"


interface TripsCardProps {
    currentUser: SafeUser | null
    data: SafeListing
    reservation: safeReservation | null
}


const mouth = [
    "tháng giêng",
    "tháng hai",
    "tháng ba",
    "tháng tư",
    "tháng năm",
    "tháng sáu",
    "tháng bảy",
    "tháng tám",
    "tháng chín",
    "tháng mười",
    "tháng mười một",
    "tháng mười hai"
]
const TripsCard:React.FC<TripsCardProps> = ({
    currentUser,
    data,
    reservation
}) =>{
  
    const router = useRouter()
    const {getByValue} = useCountries()
    const location = getByValue(data.locationValue)

    return (
        <div className="my-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 py-4">
                <Image 
                    src={data?.imageSrc}
                    width={400}
                    height={400}
                    alt="Trips Image"
                    className="w-full sm:w-[200px] sm:min-w-[200px] max-h-[200px]  object-cover"
                />
                <div className="px-2">
                    <div className="uppercase font-bold text-md">{data?.title}</div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="mt-2">
                            <div className="flex gap-2 items-center text-sm font-light">
                                <MdPlace  className="text-neutral-300"/>
                                {location?.label}
                            </div>
                            <div className="flex flex-col gap-4 mt-2">
        
                                <div>
                                    <div className="font-bold text-sm">Nhận phòng:</div>
                                    <div className="text-[0.8rem] font-light">
                                        {new Date(reservation?.startDate as string).getDate()} - 
                                         {mouth[new Date(reservation?.startDate as string).getMonth()]} -
                                         {new Date(reservation?.startDate as string).getFullYear()}
                                    </div>
                                </div>
                
                                <div>
                                    <div className="font-bold text-sm">Trả phòng:</div>
                                    <div  className="text-[0.8rem] font-light">
                                        {new Date(reservation?.endDate as string).getDate()} -
                                        {mouth[new Date(reservation?.endDate as string).getMonth()]} -
                                        {new Date(reservation?.endDate as string).getFullYear()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 hidden lg:block">
                            <button className="text-white rounded-full px-6 py-1 bg-orange-500 text-center text-sm">20% off</button>
                            <div className="px-4 font-light text-sm">{data.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})} / đêm</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="py-2 flex flex-col md:flex-row md:justify-between md:items-center px-2">
               <div>
                <div className="font-bold text-sm">Có sẵn những tháng trong năm:</div>
                    <div className="capitalize font-light text-[0.8rem] cursor-pointer">
                    {new Date(data?.createdAt).getMonth() === new Date(data?.night).getMonth() ?<div>{mouth[new Date(data?.night).getMonth()]}</div>: <div>{mouth[new Date(data?.createdAt).getMonth()]} - {mouth[new Date(data?.night).getMonth()]}</div>}
                    </div>
               </div>
                <div className="mt-4">
                    <Button 
                        label="Chi tiết"
                        onClick={()=>router.push(`/trips/${data?.id}`)}
                    />
                
                </div>
            </div>
            
        </div>
    )
}

export default TripsCard
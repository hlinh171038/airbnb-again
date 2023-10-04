"use client"

import { Listing, Reservation } from "@prisma/client";
import { SafeComment, SafeListing, SafeUser } from "../../types"
import Image from "next/image";
import HeartButton from "../HeartButton";
import useCountries from "../../hooks/useCountries";
import { compareAsc, format } from 'date-fns'
import {useCallback,useMemo} from 'react'
import Button from "../Button";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";

interface ListingCardProps {
    currentUser: SafeUser | null;
    data: SafeListing;
    reservation?:Reservation;
    onAction?: (id:string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    comment?: SafeComment[];
}
const ListingCard:React.FC<ListingCardProps> =({
    currentUser,
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId='',
    comment = []
}) =>{
    const {getByValue} = useCountries()
    const location = getByValue(data.locationValue);
    const router = useRouter()
    
    const reservationDate = useMemo(()=>{
        if(!reservation){
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start,'PP')}- ${format(end, 'PP')}`
    },[reservation])

    // price
        const price = useMemo(()=>{
            if(reservation){
                return reservation.totalPrice;
            }

            return data.price
        },[reservation, data.price])

    // handle cancel
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation();
        if(disabled){
            return null;
        }
        onAction?.(actionId)
    },[actionId,onAction,disabled])

    // all star
    const TotalStar = useMemo(() =>{
        let filterallcomment = comment.filter((item)=> item.listingId === data.id);
        let result = filterallcomment.reduce((cal, currentValue) =>{
            return cal+currentValue?.start
        },0);
        return filterallcomment.length>0 ? (result / filterallcomment.length).toFixed(2): '0.00'
    },[comment,data.id])
    return (
        <div
            onClick={()=> router.push(`/listings/${data.id}`)}
            className="
                col-span-1
                cursor-pointer
                group
            "
        >
            <div className="flex flex-col gap-2 w-full relative overflow-hidden rounded-xl  h-[16rem]">
                <Image 
                    src={data.imageSrc}
                    alt="Listing"
                    width={300}
                    height={300}
                    className="
                        group-hover:scale-110
                        transition
                        w-full
                        h-full
                        object-cover
                    "
                />
                <div className="absolute top-3 right-3">
                    <HeartButton 
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
           <div  className="flex justify-between mt-4">
           <div className="font-semibold text-sm">
                {location?.region}, {location?.label}
            </div>
            <div className="flex items-center text-sm font-light gap-2">
              
                <div>
                    <AiFillStar  className="text-yellow-400"/>
                </div>
                <div>{TotalStar}</div>
            </div>
           </div>
            <div className="flex items-center gap-2 text-[0.8rem] font-light text-neutral-500">
                <div>
                    {new Date(data?.createdAt).getDate()} thg
                    {new Date(data?.createdAt).getMonth()+ 1} -
                    {new Date(data?.createdAt).getFullYear()} 
                </div>
                <div>-</div>
                <div>
                    {new Date(data?.night).getDate()} thg
                    {new Date(data?.night).getMonth()+ 1} -
                    {new Date(data?.night).getFullYear()} 
                </div>
            </div>
         
            <div className="font-light text-neutral-500 text-[0.8rem]">
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold text-sm">
                    {price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                </div>
                {!reservation && (
                    <div className="font-light text-[0.8rem]"> / night</div>
                )}
            </div>
            {onAction && actionLabel && (
                <Button 
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleCancel}
                    />
            )}
        </div>
    )
}

export default ListingCard
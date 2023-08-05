"use client"

import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "../../types"
import Image from "next/image";
import HeartButton from "../HeartButton";
import useCountries from "../../hooks/useCountries";
import { compareAsc, format } from 'date-fns'
import {useCallback,useMemo} from 'react'
import Button from "../Button";
import { useRouter } from "next/navigation";

interface ListingCardProps {
    currentUser: SafeUser | null;
    data: Listing;
    reservation?:Reservation;
    onAction?: (id:string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}
const ListingCard:React.FC<ListingCardProps> =({
    currentUser,
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId=''
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
    return (
        <div
            onClick={()=> router.push(`/listings/${data.id}`)}
            className="
                col-span-1
                cursor-pointer
                group
            "
        >
            <div className="flex flex-col gap-2 w-full relative overflow-hidden rounded-xl w-full h-full">
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
            <div className="font-semibold text-lg">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    $ {price}
                </div>
                {!reservation && (
                    <div className="font-light">night</div>
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
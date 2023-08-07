"use client"

import { Listing, Reservation, User } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react";

import Container from "@/app/components/Container";
import { SafeListing, SafeUser } from "@/app/types";
import ListingHead from "@/app/components/listings/ListingHead";
import { categories } from "@/app/components/navbars/Categories";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { houseArr } from "@/app/components/modals/RentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};
interface ListingClientProps {
    reservation?: Reservation[];
    listing: SafeListing  & {
        user: SafeUser 
    } ;
    currentUser: SafeUser | null;

}

const ListingClient:React.FC<ListingClientProps> =({
    listing,
    currentUser,
    reservation = []
}) =>{

    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [totalPrice,setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);
    const [countDay,setCountDay] = useState(1) 

    const disabledDates = useMemo(() =>{
        let dates:Date[] = [];
        reservation.forEach((item:any)=>{
            const range = eachDayOfInterval({
                start: new Date(item.startDate),
                end: new Date(item.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    },[reservation]);

    const category = useMemo(()=>{
        return categories.find((item:any)=>{
            return item.label === listing?.category
        })
    },[listing?.category])

    const onCreateReservation = useCallback(()=>{
        if(!currentUser)
        {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/reservations',{
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(()=>{
            toast.success('Listing reservated');
            setDateRange(initialDateRange);
            router.refresh();
        }).catch(()=>{
            toast.error('Something went wrong');
        }).finally(()=>{
            setIsLoading(false)
        })
    },[
        totalPrice,
        currentUser,
        dateRange,
        listing?.id,
        router,
        loginModal
    ])

    const house = useMemo(()=>{
        return houseArr.find((item:any)=>{
            return item.label === listing?.house
        })
    },[listing?.house])

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate)
        {
            const countDay = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );
            setCountDay(countDay)

            if(countDay && listing.price) {
                setTotalPrice(countDay * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    },[dateRange, listing.price]);
 return (
   <Container >
    <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
            <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue = {listing.locationValue}
                id={listing.id}
                currentUser={currentUser}
            />
            <div
                className="
                   grid
                   grid-cols-2 
                   gap-4

                "
               
            >
                <div className="item2" >
                    <ListingInfo 
                        user={listing.user}
                        category={category}
                        description = {listing.description}
                        roomCount = {listing.roomCount}
                        bed = {listing.bed}
                        guestCount = {listing.guestCount}
                        bathroomCount = {listing.bathroomCount}
                        locationValue = {listing.locationValue}
                        house = {house}
                        utilities = {listing.utilities }
                    />
                    <ListingReservation
                        price = {listing.price}
                        totalPrice = {totalPrice}
                        onChangeDate = {(value:any)=> setDateRange(value)}
                        dateRange = {dateRange}
                        onSubmit={onCreateReservation}
                        disabled = {isLoading}
                        disabledDates={disabledDates}
                        countDay = {countDay}
                        locationValue = {listing.locationValue}
                    />
                </div>
                
               <div className="item1" >
                    linh thai recommend
               </div>
            </div>
            
        </div>
    </div>
       
   </Container>
 )
}

export default ListingClient
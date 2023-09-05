"use client"

import { Comment, Listing, Reservation, User } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react";

import Container from "@/app/components/Container";
import { SafeComment, SafeListing, SafeUser } from "@/app/types";
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
import ListingBill from "@/app/components/listings/ListingBill";
import CommentSession from "@/app/components/comments/CommentSession";
import ListingRule from "@/app/components/listings/ListingRule";
import Footer from "@/app/components/Footer";
import ListingBillMobile from "@/app/components/listings/ListingBillMobile";




export const initialDateRange = {
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
    comments: SafeComment[],
    allUser: User[]
}

const ListingClient:React.FC<ListingClientProps> =({
    listing,
    currentUser,
    comments =[],
    reservation = [],
    allUser=[]
}) =>{

    const loginModal = useLoginModal();
    
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [totalPrice,setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);
    const [countDay,setCountDay] = useState(1) ;
    const [isFixed, setIsFixed] = useState(false);
    const scrollThreshold = 70;

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

    const house = useMemo(()=>{
        return houseArr.find((item:any)=>{
            return item.label === listing?.house
        })
    },[listing?.house])


   const pageY = document.getElementById('scroll')
    // handle scroll listing
    useEffect(() => {
        const handleScroll = () => {
         setIsFixed(pageY!== null && pageY.getBoundingClientRect().top >= scrollThreshold);
        };
   
       window.addEventListener('scroll', handleScroll);
   
       return () => {
         window.removeEventListener('scroll', handleScroll);
       };
     });
   
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
   <div>
        <Container >
            <div className="max-w-screen-lg mx-auto ">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue = {listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                        comments = {comments}
                    />
                    <div
                        className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
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
                                disabled = {isLoading}
                                disabledDates={disabledDates}
                                countDay = {countDay}
                                locationValue = {listing.locationValue}
                                maxnight = {listing.night}
                                
                            />
                        </div>
                        
                    <div 
                    id="scroll"
                        className={`
                            flex
                            justify-center
                        
                        `}
                    >
                        <div
                        
                            className={`
                                rounded-lg
                                transition
                                top-16
                                w-[100%]
                                h-auto
                                max-h-[100%]
                                
                            `}
                        >
                            <ListingBill 
                                price={listing.price}
                                totalPrice={totalPrice}
                                countDay ={countDay}
                                dateRange={dateRange}
                                onChangeDate = {(value:any)=> setDateRange(value)}
                                disabled = {isLoading}
                                isFixed = {isFixed}
                                who = {listing.who}
                                guestCount = {listing.guestCount}
                                disabledDates={disabledDates}
                                locationValue = {listing.locationValue}
                                maxnight = {listing.night}
                                currentUser = {currentUser}
                                id={listing.id}
                                setDateRange ={setDateRange}
                                comments = {comments}
                            />
                            <ListingBillMobile
                                price={listing.price}
                                totalPrice={totalPrice}
                                countDay ={countDay}
                                dateRange={dateRange}
                                onChangeDate = {(value:any)=> setDateRange(value)}
                                disabled = {isLoading}
                                isFixed = {isFixed}
                                who = {listing.who}
                                guestCount = {listing.guestCount}
                                disabledDates={disabledDates}
                                locationValue = {listing.locationValue}
                                maxnight = {listing.night}
                                currentUser = {currentUser}
                                id={listing.id}
                                setDateRange ={setDateRange}
                                comments = {comments}
                            />
                        
                        </div>
                    </div>
                    </div>
                    <CommentSession
                        listingId = {listing.id}
                        currentUser = {currentUser}
                        comments = {comments}
                        allUser ={allUser}
                    />
                    <hr />
                    <ListingRule
                        guestCount = {listing.guestCount}
                        utilities = {listing.utilities}

                    />
                   
                </div>
            </div>
           
        </Container>
        <Footer/>
   </div>
 )
}

export default ListingClient
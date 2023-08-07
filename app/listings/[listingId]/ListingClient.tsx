"use client"

import { Listing, Reservation, User } from "@prisma/client"
import { useMemo } from "react";

import Container from "@/app/components/Container";
import { SafeListing, SafeUser } from "@/app/types";
import ListingHead from "@/app/components/listings/ListingHead";
import { categories } from "@/app/components/navbars/Categories";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { houseArr } from "@/app/components/modals/RentModal";
interface ListingClientProps {
    // reservation?: Reservation[];
    listing: SafeListing  & {
        user: SafeUser 
    } ;
    currentUser: SafeUser | null;

}

const ListingClient:React.FC<ListingClientProps> =({
    listing,
    currentUser
}) =>{
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
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                "
            >
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
            </div>
        </div>
    </div>
       
   </Container>
 )
}

export default ListingClient
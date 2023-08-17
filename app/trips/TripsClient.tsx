"use client"

import Container from "../components/Container"
import Header from "../components/Header"
import Tag from "../components/Tag"
import ListingCard from "../components/listings/ListingCard"
import TripsCard from "../components/trips/TripsCard"
import TripsSearch from "../components/trips/TripsSearch"
import { SafeUser, safeReservation } from "../types"

interface TripsClientProps {
    currentUser: SafeUser | null
    reservations: safeReservation[]
}
const TripsClient:React.FC<TripsClientProps> = ({
    currentUser,
    reservations =[]
}) =>{
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
                <div
                    className="
                    "
                >
                    {reservations.map((reservation) =>{
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
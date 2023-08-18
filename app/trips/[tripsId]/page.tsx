import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import TripsIdClient from "./TripsIdClient"
import getTripsById from "@/app/actions/getTripsById"
import getReservation from "@/app/actions/getReservations"
import getCurrentUser from "@/app/actions/getCurrentUser"

interface IParams {
    tripsId?: string
}
const TripPage = async({params}:{params:IParams})=>{

    const trip = await getTripsById(params)
    const reservation = await getReservation({userId:trip?.userId})
    return (
        <ClientOnly>
            <TripsIdClient 
                trip={trip}
                reservation = {reservation}
            />
        </ClientOnly>
    )
}

export default TripPage
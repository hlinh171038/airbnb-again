import getCurrentUser from "../actions/getCurrentUser"
import { getListing } from "../actions/getListing"
import getReservation from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import ClientBenefit from "./ClientBenefit"

const BenefitPage = async() =>{
    const currentUser = await getCurrentUser()
    const reservation = await getReservation({userId:currentUser?.id})
    const listing = await getListing()
    return (
       <ClientOnly>
        <ClientBenefit
            reservation = {reservation}
            listing = {listing}
            currentUser = {currentUser}
        />
       </ClientOnly>
    )
}

export default BenefitPage
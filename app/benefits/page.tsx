import getCurrentUser from "../actions/getCurrentUser"
import getListing, { IListingsParams } from "../actions/getListing"
import getReservation from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import ClientBenefit from "./ClientBenefit"

interface BenefitPageProps {
    searchParams : IListingsParams
  }
const BenefitPage = async({searchParams}:BenefitPageProps) =>{
    const currentUser = await getCurrentUser()
    const reservation = await getReservation({userId:currentUser?.id})
    const listing = await getListing(searchParams)
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
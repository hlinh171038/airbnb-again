import ClientOnly from "@/app/components/ClientOnly"
import Header from "@/app/components/Header"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import ClientBenefitId from "./ClientBenefitId"
import getReservation from "@/app/actions/getReservations"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getListing, { IListingsParams } from "@/app/actions/getListing"

interface HomeProps {
    searchParams : IListingsParams
  }
const BenefitId = async({searchParams}:HomeProps) =>{
    const currentUser = await getCurrentUser()
    const reservation = await getReservation({userId:currentUser?.id})
    const listing = await getListing(searchParams)
    return (
        <ClientOnly>
            <ClientBenefitId 
                currentUser = {currentUser}
                reservation = {reservation}
                listing = {listing}
            />
        </ClientOnly>
    )
}

export default BenefitId
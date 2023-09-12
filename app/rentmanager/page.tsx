import getCurrentUser from "../actions/getCurrentUser"
import getListing, { IListingsParams } from "../actions/getListing"
import ClientOnly from "../components/ClientOnly"
import RentManagerClient from "./RentManagerClient"

interface RentManagerProps {
    searchParams : IListingsParams
  }
const RentManager = async({searchParams}:RentManagerProps) =>{
    const currentUser = await getCurrentUser()
    const listing = await getListing(searchParams)
    return (
        <ClientOnly>
            <RentManagerClient
                currentUser = {currentUser}
                listing = {listing}
            />
        </ClientOnly>
    )
}

export default RentManager
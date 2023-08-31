import getCurrentUser from "../actions/getCurrentUser"
import { getListing } from "../actions/getListing"
import ClientOnly from "../components/ClientOnly"
import RentManagerClient from "./RentManagerClient"

const RentManager = async() =>{
    const currentUser = await getCurrentUser()
    const listing = await getListing()
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
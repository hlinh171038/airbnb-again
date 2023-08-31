import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import Rent2Client from "./Rent2Client"

const RentPages = async() =>{
    const currentUser = await getCurrentUser()
    return (
        <ClientOnly>
            <Rent2Client 
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}
export default RentPages
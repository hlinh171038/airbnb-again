import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import RentClient from "./RentClient"

const RentPages = async() =>{
    const currentUser = await getCurrentUser()
    return (
        <ClientOnly>
            <RentClient 
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}
export default RentPages
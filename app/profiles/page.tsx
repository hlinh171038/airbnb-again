import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import ClientProfile from "./ClientProfile"

const Profiles = async()=>{
    const currentUser = await getCurrentUser()
    return (
        <ClientOnly>
            <ClientProfile 
                currentUser = {currentUser}
                />
        </ClientOnly>
    )
}

export default Profiles
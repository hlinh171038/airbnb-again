
import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "../components/ClientOnly"
import ContactClient from "./ContactClient"

const Contact = async() =>{
    const currentUser = await getCurrentUser();
    return (
       <ClientOnly>
            <ContactClient
                currentUser ={currentUser}
            />
       </ClientOnly>
    )
}

export default Contact
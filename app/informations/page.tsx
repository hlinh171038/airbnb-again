import getCurrentUser from "../actions/getCurrentUser"
import getInformation from "../actions/getInformation";
import ClientOnly from "../components/ClientOnly"
import ClientInformation from "./ClientInformation"


const InformationPage = async() =>{

    const currentUser = await getCurrentUser();
    const information = await getInformation(); 
    return (
       <ClientOnly>
            <ClientInformation
                currentUser ={currentUser}
                information = {information}
            />
       </ClientOnly>
    )
}
export default InformationPage
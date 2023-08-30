import ClientOnly from "../components/ClientOnly"
import ClientInformation from "./ClientInformation"


const InformationPage = () =>{
    return (
       <ClientOnly>
            <ClientInformation
                
            />
       </ClientOnly>
    )
}
export default InformationPage
import ClientOnly from "@/app/components/ClientOnly"
import ContactIdClient from "./ContactIdClient"

const ContactID = ()=>{
    return (
        <ClientOnly>
            <ContactIdClient />
        </ClientOnly>
    )
}

export default ContactID
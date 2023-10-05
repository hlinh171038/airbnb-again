"use client"

import { Listing } from "@prisma/client"
import { SafeListing, SafeUser } from "../types"
import { useMemo } from "react"
import RentManager from "../components/rents/RentManager"
import Footer from "../components/Footer"
import ClientOnly from "../components/ClientOnly"
import Container from "../components/Container"
import { useRouter } from "next/navigation"



interface RentManagerClientProps {
    listing: Listing[]
    currentUser: SafeUser | null
}
const RentManagerClient:React.FC<RentManagerClientProps> =({
    listing= [],
    currentUser
})=>{

    const router = useRouter();
   
    return (
        <div>
            <RentManager 
                listing = {listing}
                currentUser = {currentUser}
            />
            <Footer />
        </div>
    )
}

export default RentManagerClient
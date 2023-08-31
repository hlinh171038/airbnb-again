"use client"

import { Listing } from "@prisma/client"
import { SafeListing, SafeUser } from "../types"
import { useMemo } from "react"
import RentManager from "../components/rents/RentManager"


interface RentManagerClientProps {
    listing: Listing[]
    currentUser: SafeUser | null
}
const RentManagerClient:React.FC<RentManagerClientProps> =({
    listing= [],
    currentUser
})=>{
   
    return (
        <div>
            <RentManager 
                listing = {listing}
                currentUser = {currentUser}
            />
        </div>
    )
}

export default RentManagerClient
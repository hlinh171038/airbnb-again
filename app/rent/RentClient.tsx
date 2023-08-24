"use client"

import Image from "next/image"
import { SafeUser } from "../types"
import Container from "../components/Container"
import RentHeader from "../components/rents/RentHeader"
import RentHeader2 from "../components/rents/RentHeader2"
import RentHeader3 from "../components/rents/RentHeader3"
import Footer from "../components/Footer"

interface RentClientProps {
    currentUser: SafeUser | null
}

const RentClient:React.FC<RentClientProps> = ({
    currentUser
}) =>{
    return (
       <div>
            <Container>
                {/* header */}
                <RentHeader />
                <RentHeader2 />
                <RentHeader3 />
            </Container>
            <Footer />
       </div>
    )
}

export default RentClient
"use client "

import Image from "next/image";
import { SafeComment, SafeListing, SafeUser } from "../types"
import Header from "../components/Header";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import Footer from "../components/Footer";


interface FavoriteClientProps {
    currentUser: SafeUser | null;
    favoriteListing: SafeListing[];
    comment: SafeComment[]
}
const FavoriteClient:React.FC<FavoriteClientProps> =({
    currentUser,
    favoriteListing = [],
    comment=[]
}) =>{
    return (
        <div> 
             <div className="w-full h-auto relative">
            <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
                <Header
                    title="Danh sách yêu thích"
                    subtitle="Tổng hợp danh sách những địa điểm yêu thích của bạn"
                    big
                    center
                    white
                />
            </div>
            <Image
                src="/title-03.webp"
                width={1000}
                height={1000}
                alt="trips"
                objectPosition="top"
                className="w-full h-[300px] object-cover "
            />
            
            
        </div>
        <Container >
            <div 
                className="
                    grid
                    py-16
                    px-2
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                "
            >
                {favoriteListing.map((item) =>{
                    return <ListingCard 
                                currentUser={currentUser}
                                data ={item}
                                comment={comment}
                            />
                })}
            </div>
        </Container>
        <Footer />
        </div>
    )
}

export default FavoriteClient
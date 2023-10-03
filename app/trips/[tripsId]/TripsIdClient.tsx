"use client"

import Button from "@/app/components/Button"
import Container from "@/app/components/Container"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import Tag from "@/app/components/Tag"
import useCountries from "@/app/hooks/useCountries"
import { safeReservation, safeTrips } from "@/app/types"

import { Listing, User } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

interface TripsIdClientProps {
    trip: safeTrips | null;
    reservation: safeReservation[]
}
const TripsIdClient:React.FC<TripsIdClientProps> =({
    trip,
    reservation = []
})=>{
    const router = useRouter();
    const {getByValue} = useCountries();
    const location = getByValue(trip?.locationValue as string);

    const filterReservation = useMemo(()=>{
        
        let result = reservation.find((item)=>item.listingId === trip?.id)
        return result
    },[])
    return (
        <div className="flex flex-col gap-4">
            {/* header */}
            <div className="w-full h-auto relative">
            <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
                <Header 
                    title="Chuyến đi của bạn / Chi tiết"
                    subtitle="Xem thông tin chi tiết toàn bộ chuyến đi của bạn tại đây."
                    big
                    center
                    white
                />
            </div>
            <Image
                src="/trips.webp"
                width={1000}
                height={1000}
                alt="trips"
                className="w-full h-[300px] object-cover"
            />
        </div>
            <Container>
                <div className="flex flex-col gap-6 px-2">
                <div className="block sm:flex gap-4 font-light text-sm">
                    <div className="font-bold">Thông tin chủ nhà:</div>
                    <div>
                        <div className="flex gap-4">
                            <div>Chủ nhà:</div>
                            <div>{trip?.user?.name}</div>
                        </div>
                        <div className="flex gap-4">
                            <div>Email:</div>
                            <div className="hover:text-blue-400 hover:underline"><a href={`mailto:${trip?.user?.email}`}>{trip?.user?.email}</a></div>
                            <div>{trip?.user?.emailVerified}</div>
                        </div>
                        <div className="flex gap-4">
                            <div>SDT:</div>
                            <div>Cập nhật</div>
                        </div>
                        <div className="flex gap-4">
                            <div>Zalo:</div>
                            <div>Cập nhật</div>
                        </div>
                        <div className="flex gap-4">
                            <div>Facebook:</div>
                            <div>Cập nhật</div>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full flex justify-end px-4">
                    <div 
                        onClick={()=>router.push('/contact?category=Khách')}
                        className="underline text-blue-500 italic cursor-pointer text-[0.8rem] font-light"
                    >
                        Liên hệ chúng tôi
                    </div>
                </div>
                <div className="block sm:flex gap-4 text-sm font-light">
                    <div className="font-bold">Địa điểm :</div>
                    <div>{location?.label} - {location?.region}</div>
                </div>
                <div className="block sm:flex gap-4 text-sm font-light">
                    <div className="font-bold">
                        Thời gian:
                    </div>
                    <div>
                        {new Date(filterReservation?.createdAt as string).getDate()}/
                        {new Date(filterReservation?.createdAt as string).getMonth()}/
                        {new Date(filterReservation?.createdAt as string).getFullYear()}  -
                    </div>
                    
                    <div>
                        {new Date(filterReservation?.endDate as string).getDate()}/
                        {new Date(filterReservation?.endDate as string).getMonth()}/
                        {new Date(filterReservation?.endDate as string).getFullYear()}
                    </div>
                </div>
                <div className="blcok sm:flex gap-4 text-sm font-light">
                    <div className="font-bold">Loại nhà:</div>
                    <div>
                        <div>{trip?.category}</div>
                        <div>Khách hàng sử dụng {trip?.house}.</div>
                        <div>Số lượng phòng : {trip?.roomCount} phòng</div>
                        <div>Số lượng phòng tắm : {trip?.bathroomCount} phòng</div>
                        <div>Số lượng giường : {trip?.bed} cái</div>
                    </div>
                </div>
                <div className="block sm:flex gap-4 text-sm font-light">
                
                    <div className="font-bold">Số lượng khách :</div>
                    <div>
                        <div>Người lớn:{filterReservation?.adult} người</div>
                        <div>Trẻ em:{filterReservation?.child} người</div>
                        <div>Thú cưng:{filterReservation?.pet} con</div>
                    </div>
                </div>
                <div className="block sm:flex gap-4 text-sm font-light">
                    <div className="font-bold">Tổng hóa đơn:</div>
                    <div>{filterReservation?.totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                </div>
                </div>
                <div className="flex justify-between mt-4 py-4">
                    <div>
                        <Button 
                            label="Trợ lại"
                            onClick={()=>router.push('/trips')}
                        />
                    </div>
                    <div>
                        <Button 
                            label="Đến Khách Sạn"
                            onClick={()=>router.push(`/listings/${trip?.id}`)}
                        />
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}

export default TripsIdClient
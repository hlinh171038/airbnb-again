"use client"

import Button from "@/app/components/Button"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import BenefitItem from "@/app/components/benefits/BenefitItem"
import { SafeUser, safeReservation } from "@/app/types"
import { Listing } from "@prisma/client"
import Image from "next/image"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {useMemo} from 'react'

interface ClientBenefitIdProps {
    currentUser: SafeUser | null;
    reservation: safeReservation[]
    listing: Listing[]
}
const ClientBenefitId:React.FC<ClientBenefitIdProps> = ({
    currentUser,
    reservation = [],
    listing = []
}) =>{
    const params = useParams()
    const router = useRouter()
    const id = params.benefitId;

    // guess book in the month 8
    const benefit = useMemo(()=>{
        let result = reservation.filter((item)=> new Date(item.startDate).getMonth()+1 === Number(id) )
        return result
    },[id,reservation])

    return (
        <div>
            <div className="w-full h-auto relative">
                <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
                    <Header
                        title={`Danh số tháng ${id}`}
                        subtitle={`Doanh số được thống kê theo tháng ${id}`}
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
            <div className="px-4 py-4">
                <table className="w-full text-center ">
                    <tr>
                        <th>
                            Tên dịch vụ
                        </th>
                        <th>Mã khách hàng</th>
                        <th>Ngày nhận phòng</th>
                        <th>Ngày trả phòng</th>
                        <th>Tổng hóa đơn</th>
                    </tr>
                    
                        {benefit?.map((item)=>{
                        return <BenefitItem
                                key={item.id}
                                totalPrice={item.totalPrice}
                                starDay = {item.startDate}
                                endDay = {item.endDate}
                                user = {item.userId}
                                name = {item.listing.title}
                        />
                    })}
                </table>
            </div>
            <div className="py-4 px-4 ">
                <div onClick={()=>router.push('/benefits')} className="underline text-sm font-light cursor-pointer">Trở lại</div>
            </div>
            <Footer />
        </div>
    )
}

export default ClientBenefitId
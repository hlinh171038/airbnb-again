"use client"

import { SafeListing, SafeUser } from "@/app/types"
import { Listing } from "@prisma/client"
import {useMemo} from 'react'
import Header from "../Header";
import Image from "next/image";
import Button from "../Button";

interface RentManagerProps {
    listing: Listing[];
    currentUser: SafeUser | null
}
const RentManager:React.FC<RentManagerProps> =({
    listing = [],
    currentUser
}) =>{
    const filter = useMemo(()=>{
        let result = listing.filter((item)=>item.userId === currentUser?.id);
         return result;
     },[listing])
    return (
        <div>
            <div className="w-full h-auto relative">
                <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
                    <Header
                        title="Danh mục đang cho thuê"
                        subtitle="Tổng hợp danh sách những địa điểm đang được cho thuê."
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
            <div className="w-full px-4">
                <table className="w-full text-center">
                    <tr>
                        <th>Mã khách hàng</th>
                        <th>Mã phòng</th>
                        <th>Ngày nhận</th>
                        <th>Ngày trả</th>
                        <th>Tổng tiền</th>
                        <th>trạng thái</th>
                        <th>Xóa </th>
                     </tr>
                   
                     {filter.map((item)=>{
                        return (
                            <tr>
                                <td>{item?.title}</td>
                                <td>{item?.id}</td>
                                <td>{new Date(item.createdAt).getDate()}</td>
                                <td>{new Date(item.night).getDate()}</td>
                                <td>{item?.price}</td>
                                <td>status</td>
                                <td>
                                    <Button
                                        label="Xóa"
                                        onClick={()=>{}}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                    
                    
                </table>
            </div>
           
        </div>
    )
}

export default RentManager
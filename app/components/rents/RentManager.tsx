"use client"

import { SafeListing, SafeUser } from "@/app/types"
import { Listing } from "@prisma/client"
import {useMemo,useCallback} from 'react'
import Header from "../Header";
import Image from "next/image";
import Button from "../Button";
import {useState} from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface RentManagerProps {
    listing: Listing[];
    currentUser: SafeUser | null
}
const RentManager:React.FC<RentManagerProps> =({
    listing = [],
    currentUser
}) =>{
    const [status,setStatus] = useState(false)
    const router = useRouter();
    const [isActive,setIsActive] = useState(false)
    const filter = useMemo(()=>{
        let result = listing.filter((item)=>item.userId === currentUser?.id);
         return result;
     },[listing])

     //handle deleted
     const handleDeleted = useCallback((id:string)=>{
        setIsActive(true);
        axios.post('/api/deletelisting',{
            id
        })
            .then(()=>{
                toast.success('Deleted')
                router.refresh();
            
            })
            .catch((err)=>{
                toast.error('Some thing went wrong.')
            })
            .finally(()=>{
                setIsActive(false)
            })
     },[router,isActive])
     
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
                <table className="w-full text-center table-auto">
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Mã phòng</th>
                        <th>Ngày bắt đầu </th>
                        <th>Ngày kết thúc</th>
                        <th>Giá</th>
                        <th>Chi tiết</th>
                        <th>Xóa </th>
                     </tr>
                   
                     {filter.map((item)=>{
                        return (
                            <tr>
                                <td className="text-start">{item?.title}</td>
                                <td>{item?.id}</td>
                                <td>
                                    {new Date(item.createdAt).getDate()}/
                                    {new Date(item.createdAt).getMonth()+1}/
                                    {new Date(item.createdAt).getFullYear()}
                                </td>
                                <td>
                                    {new Date(item.night).getDate()}/
                                    {new Date(item.night).getMonth()+1}/
                                    {new Date(item.night).getFullYear()}
                                </td>
                                <td className="text-end px-4">{item?.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                                <td>
                                    <Button
                                        label="Chi tiết"
                                        onClick={()=>router.push(`/listings/${item?.id}`)}
                                        outline
                                    />
                                </td>
                                <td>
                                    <Button
                                        label="Xóa"
                                        onClick={()=>handleDeleted(item.id)}
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
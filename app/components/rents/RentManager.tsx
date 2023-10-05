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
import { BiDownArrow } from "react-icons/bi";
import { Pagination, Stack } from "@mui/material";
import ClientOnly from "../ClientOnly";
import Container from "../Container";

interface RentManagerProps {
    listing: Listing[];
    currentUser: SafeUser | null
}
const RentManager:React.FC<RentManagerProps> =({
    listing = [],
    currentUser
}) =>{
    const [status,setStatus] = useState(false)
    const [isActive,setIsActive] = useState(false)
    const [open,setOpen] = useState(false)
    const [titleSort,setTitleSort] = useState('Sắp xếp')
    const [currentPage,setCurrentPage] = useState(1);
    const [countPerPage,setCountPerPage] = useState(8);
    const router = useRouter();
   
    const filter = useMemo(()=>{
        let result = listing.filter((item)=>item.userId === currentUser?.id);
         return result;
     },[listing,currentUser?.id])

     const [rootArray,setRootArray] = useState(filter)
     const [arrayListing,setArrayListing] = useState(filter)


     // pagination
     const start = currentPage * countPerPage - countPerPage;
     const end = currentPage * countPerPage;

     const pagin = [];
     for(let i=0;i<Math.ceil(arrayListing.length/countPerPage);i++){
        pagin.push(i)
     }

     // handle pagination
     const handlePagination = useCallback((e:any,p: any)=>{
        setCurrentPage(p)
    },[]);
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
     },[router])

     // handle sort
     const handleSort = useCallback((title:string) =>{
        setOpen(false);
        console.log(title)
        if(title === 'lowprice'){
            setTitleSort('Giá thấp đến cao');

           let result =  filter.sort((a,b)=>{
                if(a.price >b.price) return 1;
                if(a.price <b.price) return -1;
                return 0;
            });
            setArrayListing(result);
        }else if(title === 'hightprice'){
            setTitleSort('Giá cao đến thấp');
            let result =  filter.sort((a,b)=>{
                 if(a.price >b.price) return -1;
                 if(a.price <b.price) return 1;
                 return 0;
             });
             setArrayListing(result);
        }else if(title === 'new'){
            setTitleSort('Đăng mới nhất');
            let result = filter.sort((a,b)=>{
                if(a.createdAt >b.createdAt) return 1;
                if(a.createdAt <b.createdAt) return -1;
                return 0;
            })
            setArrayListing(result);
        } else if(title === 'old') {
            setTitleSort('Đăng cũ nhất');
            let result = filter.sort((a,b)=>{
                if(a.createdAt >b.createdAt) return -1;
                if(a.createdAt <b.createdAt) return 1;
                return 0;
            })
            setArrayListing(result);
        } else if(title === 'expired'){
            setTitleSort('Đã hết hạn')
            let result = filter.filter((item)=> new Date(item.night)< new Date());
            setArrayListing(result)
        }else {
            setTitleSort('Đang cho thuê')
            let result = filter.filter((item)=> new Date(item.night)> new Date());
            setArrayListing(result)
        }
     },[filter])
     

     // check empty
     if(filter.length === 0){
        return  <ClientOnly>
                    <Container >
                        <div className="font-bold text-2xl py-4">Cho thuê</div>
                        
                        <div className="py-4">
                            <div className="text-md font-bold " >Danh mục trống</div>
                            <div className="text-[0.8rem] font-light pb-4">Đă đến lúc bạn bắt đầu cho thuê phòng với Airbnb.</div>
                            <hr/>
                            <div
                                className=" py-4  "
                            >
                                <button className="border-[1px] rounded-lg px-4 py-4 hover:bg-neutral-200 transition text-sm cursor-pointer" onClick={()=>router.push('/rent2')}>Bắt đầu cho thuê</button>
                            </div>
                        </div>
                        <hr/>
                        <div className="text-[0.8rem] py-4 cursor-pointer">Bạn gặp khó khăn / chưa biết cách cho thuê phòng !!!<span onClick={()=>router.push('/contact?category=Khách')} className="underline cursor-pointer">Truy cập Trung tâm trợ giúp</span></div>
                    </Container>
    
                </ClientOnly>
       }
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
            <div className="block lg:hidden">
                <Header 
                    title="Không thể xem"
                    subtitle="Chuyển sang loptop để quản lí mục cho thuê"
                    center
                />
                <div className="px-4 py-4" >
                    <div 
                        onClick={()=>router.push('/rent2')}
                        className="text-[0.8rem] underline hover:text-neutral-500 cursor-pointer"
                    >
                        Trở lại
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="flex items-center justify-end  py-2">
                <div className=" relative w-[20%] h-8">
                    <div className="absolute top-0 right-8 border-b-[1px] border-rose-500 px-2 cursor-pointer flex justify-between items-center w-full">
                        <div>
                            {titleSort}
                        </div>
                        <div onClick={()=>setOpen(!open)}>
                            <BiDownArrow />
                        </div>
                    </div>
                    <div className={`absolute  top-7 right-8 z-20 bg-white px-4  rounded-md shadow-md text-sm  w-full overflow-hidden transition-all ${open ?"h-auto py-4 flex flex-col gap-2":"h-0 "}`}>
                        <div className="hover:text-neutral-600 transition-all cursor-pointer" onClick={()=>handleSort('hightprice')}>Giá cao đến thấp</div>
                        <div className="hover:text-neutral-600 transition-all cursor-pointer" onClick={()=>handleSort('lowprice')}>Giá thấp đến cao</div>
                        <div className="hover:text-neutral-600 transition-all cursor-pointer" onClick={()=>handleSort('old')}>Đăng mới nhất</div>
                        <div className="hover:text-neutral-600 transition-all cursor-pointer" onClick={()=>handleSort('new')}>Đăng cũ nhất</div>
                        <div className="hover:text-neutral-600 transition-all cursor-pointer" onClick={()=>handleSort('expired')}>Đã hết hạn</div>
                        <div className="hover:text-neutral-600 transition-all cursor-pointer" onClick={()=>handleSort('inpired')}>Đang cho thuê</div>
                    </div>
                </div>
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
                    
                        {arrayListing.slice(start,end).map((item)=>{
                            return (
                                <tr key={item.id}>
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
                <div className="w-full flex justify-end px-2">
                    {/* pagination */}
                    <Stack spacing={2} className="mt-3 mb-3 flex justify-end">
                        <Pagination count={pagin.length} variant="outlined" shape="rounded" className="flex justify-end" onChange={handlePagination}/>
                    </Stack>
                </div>
                <div className="px-4 py-4" >
                    <div 
                        onClick={()=>router.push('/rent2')}
                        className="text-[0.8rem] underline hover:text-neutral-500 cursor-pointer"
                    >
                        Trở lại
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentManager
"use client"

import useFilter from "@/app/hooks/useFilter"
import Modals from "./Modals"
import Header from "../Header"
import { BsHouseDoor, BsToggle2Off, BsToggle2On } from "react-icons/bs"
import { MdOutlineMeetingRoom } from "react-icons/md"
import { GiCampingTent } from "react-icons/gi"
import { Slider } from "@mui/material"
import { useCallback, useState } from "react"
import { categories } from "../navbars/Categories"
import CategoryBox from "../navbars/CategoryBox"
import TypeItem from "../inputs/TypeItem"
import { useParams, useRouter } from "next/navigation"
import queryString from "query-string"

const room =[1,2,3,4,5,6,7,8]
const type = [
    {
        label:"Sử dụng toàn bộ căn hộ",
        sub:"Căn hộ",
        icon:BsHouseDoor
    },
    {
        label:"Ngủ trong phòng hoặc khu vực chung",
        sub:"Khu vực chung",
        icon:GiCampingTent
    },
    {
        label:"Phòng riêng và có khu vực chung",
        sub:"Phòng riêng",
        icon:MdOutlineMeetingRoom
    }
]
const FilterModal = () =>{
    const filterModal = useFilter()
    const [priceValue,setPriceValue] = useState(100000)
    const [typehouse,setTypehouse] = useState('')
    const [mainroom,setMainroom] = useState(0)
    const [guestCount,setGuestCount] = useState(0)
    const [pet,setPet] = useState(0)
    const [bedroom,setBedroom] = useState(0)
    const [bath,setBath] = useState(0)
    const [price,setPrice] = useState(0)
    const [place,setPlace] = useState('');
    const [toggle1,setToggle1] = useState(false);
    const [toggle2,setToggle2] = useState(false);
    const [toggle3,setToggle3] = useState(false);
    const [toggle4,setToggle4] = useState(false);
    const router = useRouter();
    const params = useParams();

    // 
    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setPriceValue(newValue);
        }
      };
    //handle submit
    const onSubmit = useCallback(()=>{
        // create query
        let currentQuery = {}
        // check exist params
        if(params){
            currentQuery = queryString.parse(params.toString())
        }
        // update params
        const updateQuery:any ={
            ...currentQuery,
            house:typehouse,
            roomCount:mainroom,
            bed:bedroom,
            bathroomCount:bath,
            guestCount,
            price:priceValue,
            category:place
        }
        // stringify url
        const url = queryString.stringifyUrl({
            url:"/",
            query:updateQuery
        },{skipNull:true});
        //close filter modal
        filterModal.onClose()
        // push url
        router.push(url)
    },[params,
        typehouse,
        mainroom,
        bedroom,
        guestCount,
        bath,
        priceValue,
        place,
        filterModal,
        router
    ])
    
    //handle Reset
    const handleReset = useCallback(()=>{
        setTypehouse('');
        setMainroom(0);
        setGuestCount(0);
        setPet(0);
        setBedroom(0);
        setBath(0);
        setPrice(0);
        setPlace('')
    },[])
    const bodyContent = (
        <div className="grid grid-cols-1 px-4 py-4 max-h-[70vh] overflow-y-auto gap-5">
            <Header
                title="Loại nơi ở"
                subtitle="Tìm phòng, nhà nguyên căn hoặc bất kì loại chổ ở nào."
            />
            <div className="flex flex-col w-full gap-2 md:flex-row justify-between items-center">
                {type.map((item)=>{
                    return (
                        <TypeItem
                            key={item.label}
                            onClick={()=>setTypehouse(item.label)}
                            label={item.sub}
                            icon={item.icon}
                            selected= {typehouse === item.label}
                        />
                    )
                })}
            </div>
            {/* phòng */}
            <div>
                <div>
                    <Header 
                        title="Số lượng khách"
                        subtitle=""
                    />
                    <div className="flex flex-wrap items-center gap-1 my-2">
                        {room.map((item)=>{
                            return (
                                <div 
                                    onClick={()=>setGuestCount(item)}
                                    key={item} 
                                    className={`rounded-full px-4 py-2 border-[1px] hover:bg-neutral-100 cursor-pointer ${guestCount=== item ?"bg-neutral-100":"bg-none"}`}
                                >
                                    {item === 8 ?item +'+':item}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <Header 
                        title="Số lượng pet"
                        subtitle=""
                    />
                    <div className="flex flex-wrap items-center gap-1 my-2">
                        {room.map((item)=>{
                            return (
                                <div 
                                    onClick={()=>setPet(item)}
                                    key={item} 
                                    className={`rounded-full px-4 py-2 border-[1px] hover:bg-neutral-100 cursor-pointer ${pet=== item ?"bg-neutral-100":"bg-none"}`}
                                >
                                    {item === 8 ?item +'+':item}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <Header 
                        title="Phòng ngủ"
                        subtitle=""
                    />
                    <div className="flex flex-wrap items-center gap-1 my-2">
                        {room.map((item)=>{
                            return (
                                <div 
                                    onClick={()=>setMainroom(item)}
                                    key={item} 
                                    className={`rounded-full px-4 py-2 border-[1px] hover:bg-neutral-100 cursor-pointer ${mainroom=== item ?"bg-neutral-100":"bg-none"}`}
                                >
                                    {item === 8 ?item +'+':item}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <Header 
                        title="Giường ngủ"
                        subtitle=""
                    />
                    <div className="flex flex-wrap items-center gap-1 my-2">
                        {room.map((item)=>{
                            return (
                                <div 
                                    onClick={()=>setBedroom(item)}
                                    key={item} 
                                    className={`rounded-full px-4 py-2 border-[1px] hover:bg-neutral-100 cursor-pointer ${bedroom=== item ?"bg-neutral-100":"bg-none"}`}
                                >
                                    {item === 8 ?item +'+':item}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <Header 
                        title="Phòng tắm"
                        subtitle=""
                    />
                    <div className="flex flex-wrap items-center gap-1 my-2">
                        {room.map((item)=>{
                            return (
                                <div 
                                    onClick={()=>setBath(item)}
                                    key={item} 
                                    className={`rounded-full px-4 py-2 border-[1px] hover:bg-neutral-100 cursor-pointer ${bath=== item ?"bg-neutral-100":"bg-none"}`}
                                >
                                    {item === 8 ?item +'+':item}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* giá */}
            <div>
                <Header 
                    title="Giá theo đêm"
                    subtitle="Chưa bao gồm thuế và phí"
                />
                <div>
                <Slider
                    aria-label="Temperature"
                    value={priceValue}
                    onChange={handleChange}
                    //getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={500000}
                    marks
                    min={100000}
                    max={10000000}
                    />
                    <div>Từ {priceValue.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </div>
                </div>
            </div>
            {/* place */}
            <div>
                <Header 
                    title="Nơi bạn muốn đến"
                    subtitle="Có rất nhiều sự lựa chọn với Airbnb.com"
                />
                <div className="grid text-center grid-cols-3 gap-2">
                    {categories.map((category)=>{
                        return <div 
                                    onClick={()=>setPlace(category.label)}
                                    className={`px-2 py-2 border-[1px] rounded-lg cursor-pointer ${place === category.label ?"bg-neutral-100":"bg-none"}`}
                                    key={category?.label} 
                                >
                                    {category?.label}
                                </div>
                    })}
                </div>
            </div>
            {/* recive room */}
            <div className="flex flex-col gap-2 ">
                <Header 
                    title="Tuy chọn đặt phòng"
                    subtitle=""
                />
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <div className="font-bold text-sm">Đặt phòng</div>
                        <div className="text-[0.8rem] font-light">Nhà phòng cho thuê bạn có thể đặt mà không chờ chủ nhà chấp thuận.</div>
                    </div>
                    <div onClick={()=>setToggle2(!toggle2)} className="cursor-pointer">
                        {toggle2 ? <div><BsToggle2Off size={25}/></div>:<div><BsToggle2On size={25}/></div>}
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <div className="font-bold text-sm">Tự nhận phòng</div>
                        <div className="text-[0.8rem] font-light">Dễ dàng vào chổ ở ngay khi bạn đến.</div>
                    </div>
                    <div onClick={()=>setToggle1(!toggle1)} className="cursor-pointer">
                        {toggle1 ? <div><BsToggle2Off size={25}/></div>:<div><BsToggle2On size={25}/></div>}
                    </div>
                </div>
            </div>
            {/* Better place */}
            <div className="flex flex-col gap-2 ">
                <Header 
                    title="Chổ ở hàng đầu"
                    subtitle=""
                />
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <div className="font-bold text-sm">Chủ nhà siêu cấp</div>
                        <div className="text-[0.8rem] font-light">Ở cùng với chủ nhà được công nhận.</div>
                    </div>
                    <div onClick={()=>setToggle3(!toggle3)} className="cursor-pointer">
                        {toggle3 ? <div><BsToggle2Off size={25}/></div>:<div><BsToggle2On size={25}/></div>}
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div>
                        <div className="font-bold text-sm">Airbnb plus</div>
                        <div className="text-[0.8rem] font-light">Mỗi nhà plus đều được xét duyệt về mặt chất lượng.</div>
                    </div>
                    <div onClick={()=>setToggle4(!toggle4)} className="cursor-pointer">
                        {toggle4 ? <div><BsToggle2Off size={25}/></div>:<div><BsToggle2On size={25}/></div>}
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modals
            isOpen = {filterModal.isOpen}
            onClose={()=>filterModal.onClose()}
            onSubmit={onSubmit}
            title="filter Product"
            actionLabel="Lộc "
            body={bodyContent}
            secondaryActionLabel="Xóa thông tin"
            secondaryAction={handleReset}
        />
    )
}

export default FilterModal



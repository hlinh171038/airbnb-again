"use client"

import {useCallback, useState,useMemo, useEffect} from 'react'
import { BiSearch } from "react-icons/bi"
import Container from "../Container"

import Logo from "../navbars/Logo"
import Search from "../navbars/Search"
import UserMenu from "../navbars/UserMenu"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Header from '../Header'
import { 
    Calendar,
    DateRange, 
    Range, 
    RangeKeyDict
  } from 'react-date-range';
  
  import 'react-date-range/dist/styles.css';
  import 'react-date-range/dist/theme/default.css';
import Counter from '../inputs/Counter'
import { toast } from 'react-hot-toast'
import queryString from 'query-string'
import { formatISO, set } from 'date-fns'
import useSearchModal from '@/app/hooks/useSearch'

enum STEPS {
    LOCATION = 0,
    BOOK =1,
    CHECKOUT =2,
    GUEST =3
}

const SearchModal = () =>{
    const searchModal = useSearchModal()
    const [open,setOpen] = useState(searchModal.isOpen)
    const [step,setStep] = useState(STEPS.LOCATION)
    const [location,setLocation] = useState<CountrySelectValue>()
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key:'selected'
    })
    const [guestCount,setGuestCount] = useState(1)
    const [bounch, setBounch] = useState(true);
    const [roomCount,setRoomCount] = useState(1)
    const [bathroomCount,setBathroomCount] = useState(1)
    const [navlocation,setNavlocation] = useState(false);
    const [navdate,setNavdate] = useState(false);
    const [navcount,setNavcount] = useState(false);
    const router = useRouter()
    const params = useParams();

   


    // import map
    const Map = useMemo(() => dynamic(()=>import('../Map'),{ssr:false}), [location])

    // handle change step
    const handleClickNav = useCallback((item:string)=>{
        if(item === 'location'){
            setStep(STEPS.LOCATION)
        }else if(item === 'book'){
            setStep(STEPS.BOOK)
        }else if(item === 'checkout'){
            setStep(STEPS.CHECKOUT)
        }else {
            setStep(STEPS.GUEST)
        }
    },[step])

    //handle delete
    const handleDelete = useCallback(()=>{
        setStep(STEPS.LOCATION);
        setLocation(undefined);
        setDateRange({
            startDate: new Date(),
            endDate: new Date(),
            key:'selected'
        });
        setGuestCount(1);
        setRoomCount(1);
        setBathroomCount(1);
        setNavlocation(false);
        setNavdate(false);
        setNavcount(false);
    },[step,location,dateRange,guestCount,roomCount,bathroomCount,navlocation,navdate,navcount])

    // handle submit
    const handleSubmit =useCallback(()=>{
        // check enought conditiion to submit
        if(!location){
            toast.error('Bạn chưa chọn địa điểm');
            return null;
        }
        //create query
        let currentQuery = {}
        // check params
        if(params){
            currentQuery = queryString.parse(params.toString())
        }
        // update querry
        const updateQuery:any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        // format for date
        if(dateRange.startDate){
            updateQuery.startDate = formatISO(dateRange.startDate)
        }

        if(dateRange.endDate){
            updateQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = queryString.stringifyUrl({
            url:'/',
            query: updateQuery,

        },{skipNull: true});
        // close search modal
        searchModal.onClose()
        // push router
        router.push(url)
    },[
        step,
        location,
        router,
        guestCount,
        bathroomCount,
        dateRange,
        params,
        roomCount,
    ])

    // handle navbar open search
    const handleClickNavSearch = useCallback((title:string)=>{
        if(title === 'location'){
            setNavlocation(!navlocation);
            setNavdate(false);
            setNavcount(false);
        }else if(title === 'date'){
            setNavlocation(false);
            setNavdate(!navdate);
            setNavcount(false);
        }else {
            setNavlocation(false);
            setNavdate(false);
            setNavcount(!navcount);
        }
    },[navlocation,navcount,navdate])

    let bodyContent = (
        <div>
            
        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className='flex flex-col gap-2'>
                <Header
                    title='Bạn muốn đến nơi đâu'
                    subtitle='tìm địa điểm yêu thích của bạn'
                />
                <CountrySelect 
                    value={location}
                    onChange={(value)=>setLocation(value)}
                />
                <Map center={location?.latlng}/>
            </div>
        )
    }
    if(step === STEPS.BOOK || step === STEPS.CHECKOUT){
        bodyContent = (
            <div>
               <Header 
                    title="Khi nào bạn lên đường"
                    subtitle='Chắc chắn mọi người rảnh nhé !'
               />
              <DateRange
                rangeColors={['#262626']}
                ranges={[dateRange as Range]}
                date={new Date()}
                onChange={(dateRange)=>setDateRange(dateRange.selected)}
                direction="vertical"
                showDateDisplay={false}
                minDate={new Date()}
                />
            </div>
        )
    }
  
    if(step === STEPS.GUEST){
        bodyContent = (
            <div>
                <Counter 
                    title="Khách"
                    subtitle='Bao nhiêu khách trong chuyến đi'
                    value={guestCount}
                    onChange={(value)=>setGuestCount(value)}
                />
                <Counter 
                    title="Phòng"
                    subtitle='Số lượng phòng bạn mong muốn'
                    value={roomCount}
                    onChange={(value)=>setRoomCount(value)}
                />
                <Counter 
                    title="Phòng ngủ"
                    subtitle='Số lượng phòng ngủ bạn mong muốn'
                    value={bathroomCount}
                    onChange={(value)=>setBathroomCount(value)}
                />
            </div>
        )
    }

    // scroll
    if (typeof window !== "undefined") {
        // Client-side-only code
        window.addEventListener('scroll',()=>{
          setBounch(window.scrollY > 100)
        })
      }
    // check open popup
    useEffect(()=>{
        setOpen(searchModal.isOpen)
        // if(bounch === true){
        //     searchModal.onClose()
        // }
    },[searchModal,open])
    return (
        <div 
        className={`
            bg-neutral-800/70
            border-[1px]
            shadow-md
            w-full
            h-[100vh]
            z-50
            fixed
            ${open?"block":"hidden"}
        `}
        >
             <div
            id="navbars"
            className="
                fixed
                w-full 
                bg-white 
                z-50
                shadow -sm
            "
        >
                <div className="
                py-2
                boder-none
                md:border-b-[1px]
                ">
                    <Container >
                        <div
                            className="
                                flex
                                flex-row
                                justify-between
                                items-center
                                px-2
                                py-2
                               
                            "
                        >
                           <Image 
                            className="hidden md:block cursor-pointer"
                            onClick={()=>router.push('/')}
                            src="/logo.webp"
                            alt="Avatar"
                            width={80}
                            height={80}
                        />
                                        
                            {/* <UserMenu session={session}/> */}
                          <div onClick={()=>searchModal.onClose()} className='underline font-light text-sm cursor-pointer hover:text-neutral-500'>Đóng</div> 
                        </div>


                        {/* mobile session */}
                            <div className='flex flex-col gap-2 md:hidden'>
                                <div className='flex justify-between'>
                                    <div 
                                        onClick={handleDelete}
                                        className='border-[2px] px-2 py-2  rounded-md text-sm hover:opacity-[.5] cursor-pointer'>Xóa dữ liệu</div>
                                    <div 
                                        onClick={handleSubmit}
                                        className='bg-rose-500 px-2 py-2 text-white rounded-md text-sm hover:opacity-[.5] flex items-center cursor-pointer'>Tìm kiếm</div>
                                </div>
                                {/* locatioin */}
                                <div className='border-[1px] rounded-md px-2 py-2 cursor-pointer '>
                                    <div
                                        onClick={()=>handleClickNavSearch('location')}
                                        className='
                                            flex
                                            justify-between
                                            items-center
                                          
                                        '
                                        >
                                            <div className='font-bold text-sm'>Bạn sẽ đi đâu ?</div>
                                            <div className='font-light text-[0.8rem]'>{location ? location?.label : "Tìm kiếm"}</div>
                                        </div>
                                    
                                    <div className={`mt-2  ${navlocation?"flex flex-col gap-2":"hidden"}`}>
                                        <CountrySelect 
                                            value={location}
                                            onChange={(value)=>setLocation(value)}
                                        />
                                        <Map center={location?.latlng}/>
                                    </div>
                                </div>
                                {/* date */}
                                <div className='border-[1px] rounded-md px-2 py-2 cursor-pointer'>
                                    <div
                                        onClick={()=>handleClickNavSearch('date')}
                                        className='
                                            flex
                                            justify-between
                                            items-center
                                        '
                                        >
                                            <div className='font-bold text-sm'>Thời gian</div>
                                            <div className='font-light text-[0.8rem] flex justify-between gap-2'>
                                                {dateRange.startDate === dateRange.endDate ?"Chọn ngày":
                                                <div className='flex justify-between gap-2'>
                                                    {dateRange ?<div>{dateRange.startDate?.getDate()}/{ dateRange.startDate?.getMonth() && dateRange.startDate?.getMonth()+1}/{ dateRange.startDate?.getFullYear()}</div> :"Thêm ngày"}
                                                        <span>-</span>
                                                    {dateRange ?<div>{dateRange.endDate?.getDate()}/{ dateRange.endDate?.getMonth() && dateRange.endDate?.getMonth()+1}/{ dateRange.endDate?.getFullYear()}</div> :"Thêm ngày"} 
                                                    </div>}
                                                
                                                </div>
                                    </div>
                                    <div className={` mt-2 ${navdate ?"block":"hidden"}`}>
                                    <DateRange
                                        rangeColors={['#262626']}
                                        ranges={[dateRange as Range]}
                                        date={new Date()}
                                        onChange={(dateRange)=>setDateRange(dateRange.selected)}
                                        direction="vertical"
                                        showDateDisplay={false}
                                        minDate={new Date()}
                                    />
                                    </div>
                                </div>
                                {/* count */}
                                <div className='border-[1px] rounded-md px-2 py-2 cursor-pointer'>
                                    <div
                                        onClick={()=>handleClickNavSearch('count')}
                                        className='
                                            flex
                                            justify-between
                                            items-center

                                        '
                                        >
                                            <div className='font-bold text-sm'>Khách</div>
                                            <div className='font-light text-[0.8rem]'>
                                                {guestCount ? guestCount +" khách":"Thêm khách"}    
                                            </div>
                                    </div>
                                    <div className={`mt-2 ${navcount ?"block":"hidden"}`}>
                                        <Counter 
                                            title="Khách"
                                            subtitle='Bao nhiêu khách trong chuyến đi'
                                            value={guestCount}
                                            onChange={(value)=>setGuestCount(value)}
                                        />
                                        <Counter 
                                            title="Phòng"
                                            subtitle='Số lượng phòng bạn mong muốn'
                                            value={roomCount}
                                            onChange={(value)=>setRoomCount(value)}
                                        />
                                        <Counter 
                                            title="Phòng ngủ"
                                            subtitle='Số lượng phòng ngủ bạn mong muốn'
                                            value={bathroomCount}
                                            onChange={(value)=>setBathroomCount(value)}
                                        />
                                    </div>
                                </div>
                            </div>


                        {/* desktop session */}
                        <div className="hidden md:flex items-center justify-center my-4">
                             <div className="w-[70%] rounded-full border-[1px]  flex justify-between items-center  hover:shadow-md cursor-pointer">
                                <div className=" w-full grid grid-cols-4  text-center items-center ">
                                    <div 
                                        onClick={()=>handleClickNav('location')}
                                        className={`text-sm font-light ${step ===STEPS.BOOK ?"border-none":"border-r-[1px]"} cursor-pointer px-2 py-2 ${step === STEPS.LOCATION ?"bg-neutral-200 rounded-full":"bg-none"}`}>
                                            <div className="font-bold">Địa điểm</div>
                                            <div className="text-[0.8rem]">{location ? location?.label : "Tìm kiếm điểm đến"}</div>
                                    </div>
                                    <div 
                                        onClick={()=>handleClickNav('book')}
                                        className={`text-sm font-light ${step ===STEPS.CHECKOUT ?"border-none":"border-r-[1px]"} cursor-pointer px-2 py-2 ${step === STEPS.BOOK ?"bg-neutral-200 rounded-full":"bg-none"}`}>
                                            <div className="font-bold">Nhận phòng</div>
                                            <div  className="text-[0.8rem] font-light">{dateRange ?<div>{dateRange.startDate?.getDate()}/ { dateRange.startDate?.getMonth() && dateRange.startDate?.getMonth()+1} /  { dateRange.startDate?.getFullYear()}</div> :"Thêm ngày"}</div>
                                    </div>
                                    <div 
                                        onClick={()=>handleClickNav('checkout')}
                                        className={`text-sm font-light ${step === STEPS.GUEST ?"border-none":"border-r-[1px]"}  cursor-pointer px-2 py-2 ${step === STEPS.CHECKOUT ?"bg-neutral-200 rounded-full":"bg-none"}`}>
                                            <div className="font-bold">Trả phòng</div>
                                            <div  className="text-[0.8rem] font-light">{dateRange ?<div>{dateRange.endDate?.getDate()}/ { dateRange.endDate?.getMonth() && dateRange.endDate?.getMonth()+1} /  { dateRange.endDate?.getFullYear()}</div> :"Thêm ngày"}</div>
                                    </div>
                                    <div 
                                        onClick={()=>handleClickNav('guest')}
                                        className={`text-sm font-light cursor-pointer px-2 py-2 ${step === STEPS.GUEST ?"bg-neutral-200 rounded-full rounded-r-none":"bg-none"}`}>
                                            <div className="font-bold cursor-pointer">Khách</div>
                                            <div  className="text-[0.8rem] font-light">{guestCount ? guestCount +" khách":"Thêm khách"}</div>
                                    </div>
                                </div>
                                <div className={` py-2 ${step === STEPS.GUEST ?"bg-neutral-200 rounded-full rounded-l-none":"bg-none"}`}>
                                    <div
                                        onClick={handleSubmit}
                                        className={`
                                        hidden
                                        p-2
                                        rounded-full
                                        bg-rose-500
                                        text-white
                                        md:flex
                                        justify-end
                                        hover:bg-rose-600
                                        transition-all
                                        mr-2
                                            
                                        `}
                                    >
                                        <BiSearch  size={25}/>
                                    </div>
                                </div>
                             </div>
                        </div>
                        <hr/>
                        <div className='hidden md:block'>{bodyContent}</div>
                    </Container>
                </div>
                {/* <Categories /> */}
            </div>
        </div>
    )
}

export default SearchModal
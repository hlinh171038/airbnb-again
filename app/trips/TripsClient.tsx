"use client"

import { BiDownArrow, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi"
import Container from "../components/Container"
import Header from "../components/Header"
import Tag from "../components/Tag"
import ListingCard from "../components/listings/ListingCard"
import TripsCard from "../components/trips/TripsCard"
import TripsSearch from "../components/trips/TripsSearch"
import { SafeUser, safeReservation } from "../types"
import {useCallback, useEffect, useMemo, useState} from 'react'
import useCountries from "../hooks/useCountries"
import { Pagination, Stack } from "@mui/material"
import Footer from "../components/Footer"
import TripsSearchMobile from "../components/trips/TripSearchMobile"
import Image from "next/image"

interface TripsClientProps {
    currentUser: SafeUser | null
    reservations: safeReservation[]
}
const select =[
    "mới nhất", "cũ nhất", "giá"
]
const TripsClient:React.FC<TripsClientProps> = ({
    currentUser,
    reservations =[]
}) =>{
    const [selectValue,setSelectValue] = useState('mới nhất');
    const [rootReservation,setRootReservation] = useState(reservations)
    const [uppdateRe,setUppdateRe] = useState(reservations)
    const [toggle,setToggle] = useState(false);
    const {getByValue} = useCountries();
    const [currentPage, setCurrentPage] = useState(1);
    const [countPerPages,setCountPerPage] = useState(3);
    const [openSidebar,setOpenSidebar] = useState(false);
    const [isFixed,setIsFixed] = useState(false);
    const scrollThreshold = 70;


    const handleSelect = useCallback((item:string)=>{
        setSelectValue(item);
        setToggle(false);
    },[selectValue]);

    // handle toogle selected
    const handleToggleSelect = useCallback(()=>{
        setToggle(!toggle);
    },[toggle]);

    // reservation
    const updateReservatrion = useMemo(()=>{
        let arr;
        if(selectValue === 'cũ nhất')
        {
            arr = reservations.sort((a,b)=>{
                if(a.createdAt >b.createdAt) return 1;
                if(a.createdAt <b.createdAt) return -1;
                return 0;
            })
        }else if(selectValue === 'mới nhất'){
            arr = reservations.sort((a,b)=>{
                if(a.createdAt >b.createdAt) return -1;
                if(a.createdAt <b.createdAt) return 1;
                return 0;
            })
        }else {
            arr = reservations.sort((a,b)=>{
                if(a.totalPrice >b.totalPrice) return -1;
                if(a.createdAt <b.createdAt) return 1;
                return 0;
            })
        }
        setUppdateRe(arr);
    },[selectValue]);

    // handle value
    const handleValue = useCallback((value:string)=>{
        if(value === 'all')
        {
            console.log('try')
            console.log(reservations)
            setUppdateRe(reservations);
            return;
        }
        let result  
        result = reservations.filter((item)=>item.listing.locationValue as any  === value )
        setUppdateRe(result);
    },[reservations])

    // pagination
    const start = currentPage * countPerPages -countPerPages;
    const end = countPerPages * currentPage;

    const pagin = [];
    for(let i=0;i<Math.ceil(uppdateRe.length/countPerPages);i++)
    {
        pagin.push(i)
    }
    // handle change pagination
    const handlePagination = useCallback((e:any,p: any)=>{
        setCurrentPage(p)
    },[currentPage]);

    const handleOpenSidebar =useCallback(()=>{
       if(openSidebar === true)
       {
        setOpenSidebar(false);
       }else {
        setOpenSidebar(true)
       }
    },[openSidebar]);
    
    // handle scrolling
    const pageY = document.getElementById('scroll');
        window.addEventListener('scroll', () =>{
            console.log(pageY?.getBoundingClientRect().top );
            setIsFixed(pageY!== null && pageY.getBoundingClientRect().top <= scrollThreshold);
        });
        
    
    
    console.log(isFixed)
    return (
       <div>
         
        <div className="w-full h-auto relative">
            <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
                <Header 
                    title="Chuyến đi của bạn"
                    subtitle="Tổng hợp danh sách những chuyến đi của bạn"
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
        <div
            id="scroll"
                 className={`
                    relative
                    top-[4rem]
                    px-4 
                    my-2
                    py-2
                    h-auto
                    rounded-lg
                    border-[1px]
                    duration-[300ms]
                    transition-all
                    bg-white
                    text-neutral-600
                    text-sm
                    z-20
                    w-[90%]
                    block
                    md:hidden
                 ${!isFixed  ? " sticky top-3 ":""}
                 ${!isFixed && "shadow-md"}
                 ${openSidebar ? "translate-x-[-1%]": "translate-x-[-102%]"}
            `}
        >
             {/* absolute top-[17rem] left-1 */}
             <div 
                        onClick={handleOpenSidebar}
                        style={{"borderRadius": "0 50px 50px 0"}}
                        className="absolute top-1 right-[-1.2rem] px-[0.2rem] bg-rose-500 text-white cursor-pointer  w-[22px] h-[30px] flex justify-end items-center">
                        {!openSidebar ? <BiSolidRightArrow size={20}/>:<BiSolidLeftArrow size={20} />}
                    </div>
                    <TripsSearchMobile
                        reservations ={reservations}
                        handleValue = {handleValue}
                        openSidebar = {openSidebar}
                    />
        </div>
        <Container>
           
            <div
                className="
                    grid
                    grid-cols-2
                    mt-8
                "
                style={{gridTemplateColumns: "auto auto auto auto"}}
            >
                 
                <div 
                    
                    className={`
                      hidden 
                      md:block
                       
                    `}
                >
                   
                    <TripsSearch 
                        reservations ={reservations}
                        handleValue = {handleValue}
                    />
                </div>
                <div style={{gridArea:"1/ 2 / span 2 / span 3"}}>
                    <div className="flex justify-end px-4  relative py-4 transition-all cursor-pointer">
                    
                        <div className=" absolute top-0 right-0 border-b-[1px] border-rose-500 w-[200px] capitalize hover:shadow-lg" onClick={handleToggleSelect}>{selectValue}</div>
                        <BiDownArrow className="absolute top-[0.5rem] right-0" size={10} onClick={handleToggleSelect}/>
                                <div className={`absolute top-7 right-0 bg-neutral-100 w-[200px] px-2 py-2 ${toggle ?"block": "hidden"}`} >
                                    {select.map((item: string) =>{
                                        return <div onClick={()=>handleSelect(item)} className={`capitalize hover:bg-neutral-200    `}>{item}</div>
                                    })}
                                </div>
                        </div>
                    <div
                        className="
                        "
                    >
                        {uppdateRe.slice(start,end).map((reservation) =>{
                            return <TripsCard 
                                        key={reservation.id}
                                        currentUser={currentUser}
                                        data ={reservation.listing}
                                        reservation ={reservation}
                                    />
                        })}
                    </div>
                </div>
            </div>
            {/* pagination */}
            <Stack spacing={2} className="mt-3 mb-3 flex justify-end">
                <Pagination count={pagin.length} variant="outlined" shape="rounded" className="flex justify-end" onChange={handlePagination}/>
            </Stack>
        </Container>
        <Footer />
       </div>
    )
}

export default TripsClient
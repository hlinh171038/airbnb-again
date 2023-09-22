"use client"

import Image from "next/image";
import { SafeComment, SafeListing, SafeUser } from "../types"
import Header from "../components/Header";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import Footer from "../components/Footer";
import {useState,useCallback,useMemo,useEffect} from 'react'
import { BiDownArrow } from "react-icons/bi";
import { Pagination, Stack } from "@mui/material";

const sortFavorite = [
    {
        label:'cũ nhất',

    },
    {
        label:'mới nhất',

    },
    {
        label:"đã hết hạn"
    },
    {
        label:"có sẵn"
    }
]
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
    const [sort,setSort] = useState('mới nhất');
    const [open,setOpen] = useState(false);
    const [favoriteArr,setFavoriteArr] = useState(favoriteListing);
    const [empty,setEmpty] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [countPerPage,setCountPerPage] = useState(8);

    // pagination
    const start = currentPage * countPerPage - countPerPage;
    const end = currentPage * countPerPage;

    const pagin = [];
    for(let i=0; i<Math.ceil(favoriteArr.length /countPerPage);i++){
        pagin.push(i);
    }
    //handle pagination
     // handle change pagination
     const handlePagination = useCallback((e:any,p: any)=>{
        setCurrentPage(p)
    },[currentPage]);

    // handle Open sort
    const handleOpen = useCallback(()=>{
        setOpen(!open);

    },[open])

    // handle sort
    useEffect(()=>{
        let arr;
        if(sort === 'cũ nhất')
        {
            arr = favoriteListing.sort((a,b)=>{
                if(a.createdAt >b.createdAt) return 1;
                if(a.createdAt <b.createdAt) return -1;
                return 0;
            });
            if(arr.length === 0)
            {
                setEmpty(true);
            }else{
                setEmpty(false);

            }
        }else if(sort === 'mới nhất'){
            arr = favoriteListing.sort((a,b)=>{
                if(a.createdAt >b.createdAt) return -1;
                if(a.createdAt <b.createdAt) return 1;
                return 0;
            });
            if(arr.length === 0)
            {
                setEmpty(true);
            }else{
                setEmpty(false);

            }
        }else if(sort ==='có sẵn'){
            arr = favoriteListing.filter((item) =>new Date(item.night) > new Date());
            if(arr.length === 0)
            {
                setEmpty(true);
            }else{
                setEmpty(false);

            }
        }else {
            arr = favoriteListing.filter((item) =>new Date(item.night) <= new Date());
            if(arr.length === 0)
            {
                setEmpty(true);
            }else{
                setEmpty(false);

            }
        }
        setFavoriteArr(arr);
        setOpen(false)
    },[sort])

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
        <div className="w-full px-4 flex justify-end items-center z-20 mt-4">
           <div className="relative w-[50%] md:w-[20%] z-10 hover:shadow-md px-8">
            <div 
                onClick={handleOpen}
                className="absolute top-0 right-0 border-b-[2px] border-rose-500 flex justify-between items-center w-full cursor-pointer">
                    <div className="font-light text-sm capitalize">{sort}</div>
                    <div><BiDownArrow/></div>
                </div>
                
                <div className={`absolute top-8 right-0 bg-neutral-100 w-full transition-all overflow-hidden px-4 ${open ?"h-auto  py-4":"h-0 "}`}>
                    {sortFavorite.map((item)=>{
                        return (
                            <div key={item.label} className="text-sm font-light cursor-pointer capitalize hover:text-neutral-600 transition-all" 
                                onClick={()=>setSort(`${item.label}`)}>{item.label}</div>
                        )
                    })}
                </div>
              
           </div>
        </div>
        {empty && <div className="w-full flex justify-center items-center mt-16 text-neutral-600">Listing is empty</div>}
        <Container >
            <div 
                className="
                    grid
                    py-16
                    px-2
                    gap-8
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-3
                    xl:grid-cols-4
                "
            >
                {favoriteArr.slice(start,end).map((item) =>{
                    return <ListingCard 
                                currentUser={currentUser}
                                data ={item}
                                comment={comment}
                            />
                })}
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

export default FavoriteClient
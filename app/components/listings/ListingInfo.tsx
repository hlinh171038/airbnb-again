"use client"

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types"
import Image from "next/image";
import { IconType } from "react-icons/lib";
import dynamic from "next/dynamic"
import ListingCategory from "./ListingCategory ";
import { BiMedal } from "react-icons/bi";
import {SlCalender} from 'react-icons/sl'
import { AiFillBell, AiFillDollarCircle } from "react-icons/ai";
import { useCallback, useState, useEffect} from "react";
import { utilitiesArr } from "../modals/RentModal";
import UtilityItem from "../utilities/UtilityItem";

const Map = dynamic(()=>import('../Map'), {
    ssr: false
});
// type utility  = {
//     label: string,
//     icon:IconType,
//     description: string,
//     selected: boolean
// }

interface ListingInfoProps {
    user: SafeUser | null;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    bed: number;
    category: {
        icon: IconType;
        label: string;
        description: string
    } | undefined;
    locationValue: string,
    house:{
        icon: IconType;
        description: string,
        label: string
    } | undefined;
    utilities: string[]
}
const ListingInfo:React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bed,
    bathroomCount,
    category,
    locationValue,
    house,
    utilities
}) =>{

    const {getByValue} = useCountries();
    const [isReadMore,setIsReadMore] = useState(false)

    const coordinates = getByValue(locationValue)?.latlng

  
    const handleReadMore = useCallback(()=>{
        setIsReadMore(!isReadMore);
    },[isReadMore]);

    let utilitiesCustome:any[] = [];
    for(let i=0;i<utilities.length;i++)
    {
       let result= utilitiesArr.find((item)=>item.label === utilities[i])
       console.log(result)
        if(result)
        {
            utilitiesCustome.push(result);
            console.log(utilitiesCustome)
        }
    }
    // useEffect(() => {
    //     for(let i=0;i<utilities.length;i++)
    //     {
    //        let result= utilitiesArr.find((item)=>item.label === utilities[i])
    //        console.log(result)
    //         if(result)
    //         {
    //             utilitiesCustome.push(result);
    //             console.log(utilitiesCustome)
    //         }
    //     }
    // }, [utilities,utilitiesArr,utilitiesCustome])

    return (
        <div
            className="col-span-4 flex flex-col gap-8"
        >
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center justify-between gap-2">
                    <div>Chủ nhà {user?.name}</div>
                    <Image 
                        src={user?.image as string}
                        width={50}
                        height={50}
                        alt="Avatar"
                        className="rounded-full"
                    />
                </div>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-1
                        font-light
                        text-neutral-500
                    "
                >
                    <div className="text-sm">
                        {guestCount} khách 
                    </div>
                    -
                    <div className="text-sm">
                        {roomCount} phòng ngủ
                    </div>
                    -
                    <div className="text-sm">
                        {bathroomCount} nhà tắm
                    </div>
                    -
                    <div className="text-sm">
                        {bed} giường
                    </div>
                </div>
            </div>
            <hr/>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                        {category && (
                        <ListingCategory
                            icon={category.icon}
                            label=''
                            description={category.description}
                        />
                    )}
                    {/* {house && (
                        <ListingCategory 
                            icon={house.icon}
                            label={house.label}
                            description=""
                            houseStep
                        />
                    )} */}
                   
                    <div>{house?.description}</div>
                    <div className="flex items-center">
                        <div className="flex justify-center items-center"><BiMedal size={40} className="text-neutral-700 pr-2 w-full"/></div> 
                        <p className="font-light">{user?.name} là chủ nhà siêu cấp</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-center items-center"><AiFillBell size={40} className="text-neutral-700 pr-2 w-full"/></div> 
                        <p className="font-light">Hủy miễn phí trong 48h</p>
                    </div>
                   
                </div>
                <hr />
                <div className=" font-light text-neutral-500">
                    {description && description.length >200 ?(isReadMore ? description :description.substring(0,200)+'...'):description}
                    <div className="my-2">
                        {description.length >200 && (isReadMore ? (
                            <button 
                            onClick={handleReadMore}
                            className="px-4 py-1 bg-neutral-300 text-white hover:bg-neutral-500 trasition"
                        >
                            Thu gọn
                        </button>   
                        )
                        :
                            (<button 
                                onClick={handleReadMore}
                                className="px-4 py-1 bg-neutral-300 text-white hover:bg-neutral-500 trasition"
                            >
                                Đọc thêm 
                            </button>)
                        )}
                    </div>
                 </div>
                 <hr/>
                 <div>
                    <p className="text-lg font-semibold">Nơi này có những tiện ích gì cho bạn </p>
                    <div
                        className="grid grid-cols-2 my-6"
                    >
                        {
                            utilitiesCustome.map(item =>{
                                return <UtilityItem 
                                            label={item.label}
                                            description ={item.description}
                                            icon ={item.icon}
                                        />
                            })
                        }
                    </div>
                    
                 </div>
                
            </div>
            <hr />
            {/* <Map center={coordinates} /> */}
        </div>
    )
}

export default ListingInfo
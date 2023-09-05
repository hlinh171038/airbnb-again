"use client"

import { SafeComment, SafeUser } from "@/app/types";
import Header from "../Header";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";
import {useCallback, useState,useMemo} from 'react'


import {
   FacebookShareButton,
   FacebookIcon,
   WhatsappShareButton,
   WhatsappIcon,
   LinkedinShareButton,
   LinkedinIcon,
   TelegramShareButton,
   TelegramIcon,
   FacebookMessengerShareButton,
   FacebookMessengerIcon,
   PinterestShareButton,
   PinterestIcon,
   TwitterShareButton,
   TwitterIcon,
   EmailShareButton,
   EmailIcon

  } from "react-share";
import Button from "../Button";
import { IoShareOutline } from "react-icons/io5";
import { FcShare } from "react-icons/fc";
import {RxCross2} from 'react-icons/rx'
import { Comment } from "@prisma/client";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

interface ListingHeadProps {
    title: string;
    imageSrc : string;
    locationValue: string;
    id: string;
    currentUser: SafeUser | null;
    comments: SafeComment[]
}
const ListingHead:React.FC<ListingHeadProps> =({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser,
    comments=[],
}) =>{
    const [isShare, setIsShare] = useState(false);
    const shareUrl = 'https://pakkamarwadi.tk/';
    const {getByValue} = useCountries();

    const handleShare = useCallback(()=>{

    },[])

    // comment by current id
    const commentById = useMemo(()=>{
        const result =comments.filter((item)=>item.listingId === id);
        return result
    },[])

     // handle count all star
     const handleCountAllStar = useCallback(()=>{
        if(commentById.length === 0)
        {
            return 0;
        }
        let count = 0

        for(let i=0;i<commentById.length;i++)
        {
            count += commentById[i].start;
        }
        return  (count /commentById.length).toFixed(2)
    },[commentById])

    const location = getByValue(locationValue);
    return (
       
        <>
            <div className="w-full h-[100px]">
                linh
            </div>
             <div>
                <div className="font-semibold text-4xl uppercase ">{title}</div>
                <div className="flex gap-1 cursor-pointer">
                    <div className="text-sm flex"><AiFillStar/>{handleCountAllStar()}<span className="flex items-center"><BsDot/></span><span className="underline font-bold">{commentById.length} đánh giá</span></div>
                    <span className="flex items-center"><BsDot/></span>
                    <div className="text-sm underline">{location?.region} - {location?.label}</div>
                </div>
             </div>
           <div className="relative w-full py-2 h-4 ">
            <div 
                onClick={()=>setIsShare(!isShare)}
                className="absolute top-3 right-6 cursor-pointer flex items-center justify-center px-2 h-full py-2 transition "> 
                {!isShare ? <IoShareOutline size={30} className="hover:text-cyan-500"/>:<RxCross2 className="hover:text-red-600"/>}
            </div>
            <div 
                className={`
                    absolute
                    top-0
                    right-16
                    transition
                   bg-neutral-200
                    rounded-lg
                    overflow-hidden
                    flex
                    justify-between
                    items-center
                    py-1
                    cursor-pointer
                    ${isShare ?"w-[300px]":"w-0"}
                    ${isShare &&"px-1"}
                    ${isShare ? "animate-trans-right": "animate-trans-left"}
                `}
            >

                <FacebookShareButton url={shareUrl} hashtag={`#airbnb...`}>
                    <FacebookIcon size={35} round={true}/>
                </FacebookShareButton>
                <WhatsappShareButton url={shareUrl} >
                    <WhatsappIcon size={35} round={true}/>
                </WhatsappShareButton>
                <LinkedinShareButton url={shareUrl} >
                    <LinkedinIcon size={35} round={true}/>
                </LinkedinShareButton>
                <TelegramShareButton url={shareUrl} >
                    <TelegramIcon size={35} round={true}/>
                </TelegramShareButton>
                <PinterestShareButton url={shareUrl} media ={imageSrc}>
                    <PinterestIcon size={35} round={true}/>
                </PinterestShareButton>
                <TelegramShareButton url={shareUrl} >
                    <TelegramIcon size={35} round={true}/>
                </TelegramShareButton>
                <EmailShareButton url={shareUrl} >
                    <EmailIcon size={35} round={true}/>
                </EmailShareButton>
                <TwitterShareButton url={shareUrl} >
                    <TwitterIcon size={35} round={true}/>
                </TwitterShareButton>
            </div>
            <div
                className="absolute top-3 right-1 "
               >
                <HeartButton 
                        listingId={id}
                        currentUser={currentUser}
                    />
            </div>
           </div>
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-auto
                    rounded-xl
                    relative
                "
            >
                <Image 
                    src={imageSrc}
                    
                    alt="Listing"
                    fill
                    className="object-cover w-full"
                />
            </div>
        </>
    )
}

export default ListingHead
"use client"

import {useMemo,useCallback,useState} from 'react';
import { User } from "@prisma/client";
import Image from "next/image";
import { SafeUser } from '@/app/types';
import { AiFillStar } from 'react-icons/ai';


interface CommentItemProps {
    description: string;
    star:number;
    createdAt: string;
    allUser: User[];
    userId: string
}
const CommentItem:React.FC<CommentItemProps> = ({
    description,
    star,
    createdAt,
    userId,
    allUser =[]
}) =>{
    const [isReadMore,setIsReadMore] = useState(false)
    const [isOpen,setIsOpen] = useState(false);

    const checkImage = useCallback((item:any) => {
        for(let i=0;i<allUser.length;i++)
        {
            if(allUser[i].id === item){
                return allUser[i].image
            }
        }
        return '/placeholder.jpg'
    }, [allUser]);

    const checkName = useCallback((item:any)=>{
        for(let i=0;i<allUser.length;i++)
        {
            if(allUser[i].id === item){
                return allUser[i].name
            }
        }
        return 'Anonymos'
    },[])

    // handle star
    const handleStar = useCallback((number:number)=>{
        const star = []
        for(let i=1;i<=5;i++)
        {
            if(i<=number){
                star.push('text-yellow-400') 
            }else{
                star.push('text-neutral-400') 
            }
        }
        return star
    },[])

    //handle read more
    const handleReadMore = useCallback(()=>{
        setIsReadMore(!isReadMore);
    },[isReadMore])

    console.log(checkImage(userId))
    return (
        <div className='mb-4'>
            {/* header */}
            <div
                className='
                    flex
                    justify-start
                    
                '
            >
                <Image
                    src={checkImage(userId ) as string}
                    alt="Avatar"
                    width={50}
                    height={50}
                    className='rounded-full '
                />
                <div>
                    <div className='font-bold px-2'>{checkName(userId)}</div>
                    <div className='text-sm font-light px-2'>
                        {new Date(createdAt).getDate()} thg
                        {new Date(createdAt).getMonth()}-
                        {new Date(createdAt).getFullYear()}
                    </div>
                </div>
            </div>
            <div className='px-12 py-2 flex'>
                {handleStar(star).map((item)=>{
                    return (
                        <div className={item}><AiFillStar/></div>
                    )
                })}
            </div>
            <div className='
                    w-full 
                    h-auto
                    min-h-[80px] 
                    border-[1px] 
                    px-4 
                    py-4 
                    rounded-lg
                    font-light
                    text-sm
                    '
                    >
                {description.length>235 ? isReadMore? description: description.substring(0,235) +'...': description}
                {description.length>235 ?(isReadMore?(
                    <span
                        onClick={handleReadMore}
                        className='underline text-sm font-bold ml-2'
                    >Thu nhỏ</span>
                ):
                (<span
                    onClick={handleReadMore}
                    className='underline text-sm font-bold'
                >Đọc thêm</span>)
                ):""}
            </div>
        </div>
    )
}
export default CommentItem
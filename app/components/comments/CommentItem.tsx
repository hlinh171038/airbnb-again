"use client"

import {useMemo,useCallback} from 'react';
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
    console.log(allUser);

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
            <div className='w-full h-[100px] min-h-[100px] border-[1px] px-4 py-4 rounded-lg'>
                {description}
            </div>
        </div>
    )
}
export default CommentItem
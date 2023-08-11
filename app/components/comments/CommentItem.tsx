"use client"

import {useMemo,useCallback} from 'react';
import { User } from "@prisma/client";
import Image from "next/image";
import { SafeUser } from '@/app/types';


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
    console.log(checkImage(userId))
    return (
        <div>
            {/* header */}
            <div>
                <Image
                    src={checkImage(userId ) as string}
                    alt="Avatar"
                    width={50}
                    height={50}
                />
            </div>
        </div>
    )
}
export default CommentItem
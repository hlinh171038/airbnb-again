"use client"

import { safeReservation } from "@/app/types"
import {useState} from 'react'

interface BenefitItemProps {
   totalPrice:number;
   starDay:string;
   endDay:string;
    user:string;
    name: string;
   
}
const BenefitItem:React.FC<BenefitItemProps>= ({
    totalPrice,
    starDay,
    endDay,
    user,
    name,
   
}) =>{
    
    return (
        <tr className="my-2">
            <td className="text-start">{name}</td>
            <td>{user}</td>
            <td>
                {new Date(starDay).getDate()} /
                {new Date(starDay).getMonth() + 1} /
                {new Date(starDay).getFullYear()}
             </td>
            <td>
                {new Date(endDay).getDate()} /
                {new Date(endDay).getMonth() + 1} /
                {new Date(endDay).getFullYear()} 
            </td>
            <td className="text-end">{totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
        </tr>
        
    )
}

export default BenefitItem
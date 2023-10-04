"use client"

import { IconType } from "react-icons/lib";
import {useCallback, useEffect, useRef,useLayoutEffect,useState} from 'react'
import { GiConsoleController } from "react-icons/gi";
import { utilitiesArr } from "../modals/RentModal";

interface UtilitiesInputProps {
    onClick: (value:string)=>void;
    selected:boolean;
    label: string;
    icon:IconType;
}
const UtilitiesInput:React.FC<UtilitiesInputProps> = ({
    onClick,
    selected,
    label,
    icon:Icon
}) =>{
   
    const [isStyle,setIsStyle] = useState(false);
    const [isSelected,setIsSelected] = useState(false)
        const handleStyle = useCallback(()=>{
            setIsStyle(true)
            setTimeout(()=>{
                setIsStyle(false)
            },200)
        },[])
        useEffect(()=>{
        if(selected)
        {
            handleStyle()
        }
        },[selected,handleStyle])
      
  
    return (
        <div
        onClick={()=>onClick(label)}
        className={`
        flex
        flex-col
        items-center
        justify-center
        gap-1
        transition
        hover:text-neutral-800
        hover:border-neutral-800
        cursor-pointer
        py-2
        border-[1px]
        rounded-lg
        ${selected && "border-neutral-800"}
        
        ${selected ?"text-neutral-800 bg-neutral-100" : "text-neutral-500"}
        `}
    >
        <Icon size={34} className={`transition ${isStyle ?"scale-75 ": "scale-100 "}`} />
        <span className="text-sm font-medium" >{label}</span>
    </div>
    )
}
 
export default UtilitiesInput
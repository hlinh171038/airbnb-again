"use client"

import { IconType } from "react-icons/lib";
import {useCallback, useEffect, useRef,useLayoutEffect,useState} from 'react'
import Header from "../Header";


interface CategoryInputProps {
    onClick: (value:string)=>void;
    selected: boolean;
    label: string;
    icon:IconType;
    house?:boolean;
    description?:string;
}
const CategoryInput:React.FC<CategoryInputProps> = ({
    onClick,
    selected,
    label,
    icon:Icon,
    house,
    description
}) =>{
   
    const [isStyle,setIsStyle] = useState(false);

    
    const handleStyle = useCallback(()=>{
         setIsStyle(true)
          setTimeout(()=>{
            setIsStyle(false)
         },200)
    },[isStyle])
    useEffect(()=>{
       if(selected)
       {
        handleStyle()
       }
    },[selected])
    return (
        <div
            onClick={()=>onClick(label)}
            className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
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
            {house ? (
                <div className="flex flex-row justify-between items-center w-full px-4">
                    <div>
                        <div className="font-bold text-sm">
                            {label}
                        </div>
                        <div className="font-light text-sm">{description}</div>
                    </div>
                    <Icon size={34} className={`hidden md:block transition ${isStyle ?"scale-75 ": "scale-100 "}`} />
                    </div>
            ):
            <div className="flex flex-col justify-center items-center">
                <Icon size={34} className={`transition ${isStyle ?"scale-75 ": "scale-100 "}`} />
                <span className="text-sm font-medium" >{label}</span>
            </div>
        }
        </div>
    )
}
 
export default CategoryInput
"use client"

import { IconType } from "react-icons/lib";
import {useCallback, useEffect, useRef,useLayoutEffect,useState} from 'react'


interface CategoryInputProps {
    onClick: (value:string)=>void;
    selected: boolean;
    label: string;
    icon:IconType
}
const CategoryInput:React.FC<CategoryInputProps> = ({
    onClick,
    selected,
    label,
    icon:Icon
}) =>{
   
    const [isStyle,setIsStyle] = useState(false);

    // const handleStyle = () =>{
    //     setIsStyle(true);
    //     // let style = setTimeout(()=>{
    //     //     setIsStyle(false)
    //     // },1000);
    //     //  clearTimeout(style);
    // }

    const handleStyle = useCallback(()=>{
        console.log('try')
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
            
            py-4
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
 
export default CategoryInput
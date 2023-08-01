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

 console.log(label)
    const handleStyle = useCallback(()=>{
        console.log('try')
         setIsStyle(true)
          setTimeout(()=>{
            setIsStyle(false)
         },200)
    },[isStyle])
  
    return (
      <div
        onClick={()=>onClick(label)}
        className={`
            ${selected && 'text-rose-700'}
        `}
      >
      {label}
      </div>
    )
}
 
export default UtilitiesInput
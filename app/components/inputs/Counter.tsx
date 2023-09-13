"use client"

import { AiFillMinusCircle, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import {useCallback} from 'react'


interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value:number) => void
}
const Counter:React.FC<CounterProps> =({
    title,
    subtitle,
    value,
    onChange
}) =>{

    const onAdd = useCallback(()=>{
        onChange(value + 1);
    },[onChange,value]);

    const onReduce = useCallback(()=>{
        if(value === 1){
            return;
        }
        onChange(value - 1);
    },[onChange,value])
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1">
                <span className="capitalize font-bold  ">{title}</span>
                <span className="text-sm  text-neutral-400 font-light">{subtitle}</span>
            </div>
            <div className="flex ga-1">
                <div
                    onClick={onReduce}
                    className="
                    flex
                    items-center
                    justify-center
                    text-neutral-600
                    cursor-pointer
                    hover:opacity-80
                    transition
                   
                    "
                >
                   <AiFillMinusCircle />
                </div>
                <span className="font-light text-md text-neutral-600 px-3">{value}</span>
                <div
                    onClick={onAdd}
                    className="
                    flex
                    items-center
                    justify-center
                    text-neutral-600
                    cursor-pointer
                    hover:opacity-80
                    transition
               
                    "
                >
                    <BsPlusCircleFill/>
                    
                </div>
            </div>
        </div>
    )
}

export default Counter
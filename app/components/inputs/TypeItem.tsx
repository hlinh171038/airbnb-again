"use client"

import { IconType } from "react-icons/lib";


interface TypeItemProps {
    label:string;
    icon:IconType;
    onClick:()=>void;
    selected: boolean;
}
const TypeItem:React.FC<TypeItemProps> = ({
    label,
    icon:Icon,
    onClick,
    selected
}) =>{
    return (
        <div 
            onClick={onClick}
            className={`cursor-pointer border-[1px] rounded-lg px-4 hover:bg-neutral-100 py-2 flex justify-center items-center flex-col text-sm font-light ${selected ?"bg-neutral-100":"bg-none"}`}>
            <div><Icon size={25}/></div>
            <div>{label}</div>
        </div>
    )
}

export default TypeItem
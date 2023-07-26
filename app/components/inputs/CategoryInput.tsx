"use client"

import { IconType } from "react-icons/lib";


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
            p-1
            ${selected ?"bg-neutral-100": "bg-transparent"}
            ${selected ?"text-neutral-800": "text-neutral-500"}
            `}
        >
            <Icon size={34} />
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}

export default CategoryInput
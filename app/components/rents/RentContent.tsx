"use client"

import { IconType } from "react-icons/lib";

interface RentContentProps {
    title?: string;
    content?: string;
    bold?:boolean;
    large?:boolean;
    center?: boolean;
    hidden?: boolean;
    padding?:boolean;
    icon?:IconType
}
const RentContent:React.FC<RentContentProps> = ({
    title,
    content,
    bold,
    large,
    center, 
    hidden,
    padding,
    icon:Icon
}) =>{
    return (
        <div  className={`
            ${Icon && "flex justify-between items-center gap-2"}
        `}>
            <div>
                    <p  
                    className={`
                        ${!padding && "py-1"}
                        ${large ?"text-4xl":"text-md"}
                        ${bold ?"font-semibold": "font-normal"}
                        ${center ?"text-center": "text-start"}
                    `}
                >{title}</p>
                    <p className={`
                        text-sm 
                      text-neutral-600
                        text-start
                        ${hidden && "hidden md:block"}
                    `}>
                        {content}
                    </p>
            </div>
            <div className="hidden sm:block">
                {Icon && (
                    <Icon size={100} />
                )}
            </div>
        </div>           
    )
}

export default RentContent
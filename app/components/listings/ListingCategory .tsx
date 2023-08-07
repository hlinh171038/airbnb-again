"use client"

import { IconType } from "react-icons/lib"


interface ListingCategoryProps {
    icon:IconType;
    label: string;
    description: string,
    houseStep?: boolean
}
const ListingCategory:React.FC<ListingCategoryProps> =({
    icon:Icon,
    label,
    description,
    houseStep
})=>{
    return (
        <div className="flex flex-col gap-6">
            <div className="flex felx-row items-center gap-1">
                <Icon size={40} className="text-neutral-600" />
                <div 
                    className={`
                     ${houseStep ?"capitalize font-light":"text-lg font-semibold"}
                    `}
                >
                    {label}
                </div>
                <div className=" font-light">
                    {description}
                </div>
            </div>
        </div>
    )
}

export default ListingCategory
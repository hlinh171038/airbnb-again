"use client"

import { IconType } from "react-icons/lib";


interface UtilityProps {
    label: string;
    icon:IconType;
    description: string
}
const UtilityItem:React.FC<UtilityProps> = ({
    label,
    icon:Icon,
    description
}) =>{
    return <div
                className="
                    flex
                    items-center
                    py-2
                    gap-4
                    cursor-pointer
                "
            >
                <Icon size={40} className="text-neutral-600"/>
                 <div className="font-light">{label}</div>
            </div>
}

export default UtilityItem
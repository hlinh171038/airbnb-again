"use client"

import { useCallback, useState } from 'react'
import {BiDownArrow, BiSolidUpArrow, BiUpArrow} from 'react-icons/bi'

interface RentPopUpProps {
    label: string;
    content: string
}

const RentPopUp:React.FC<RentPopUpProps> =({
    label,
    content
})=>{
    const [isOpen,setIsOpen] = useState(false);
    const handlePopUp = useCallback(()=>{
        setIsOpen(!isOpen);
    },[isOpen])
    return (
        <div className='w-full border-b-[1px]'>
            <div className='flex flex-row gap-10 items-center justify-between py-4'>
                <div className='text-sm font-bold'> {label}</div> 
                <div className='transition-all'>
                    {!isOpen ?
                    <BiDownArrow 
                        onClick={handlePopUp}
                        /> : 
                    <BiUpArrow  
                        onClick={handlePopUp}
                    />
                    }
                </div>
               
            </div>
                <div 
                    className={`
                        transition
                        ${isOpen ? "h-0 overflow-hidden": "h-full"}
                    `}
                >
                    <p className='text-sm text-justify text-neutral-600 pb-4'>{content}</p>
                </div>
        </div>
    )
}

export default RentPopUp
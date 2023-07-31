"use client"

interface RentContentProps {
    title?: string;
    content?: string;
    bold?:boolean;
    large?:boolean;
    center?: boolean;
    hidden?: boolean;
    padding?:boolean
}
const RentContent:React.FC<RentContentProps> = ({
    title,
    content,
    bold,
    large,
    center, 
    hidden,
    padding
}) =>{
    return (
        <div >
         <p  
            className={`
                ${!padding && "py-3"}
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
    )
}

export default RentContent
"use client"

import Image from "next/image";

interface ContactItemProps {
    title: string;
    description: string;
    img:string
}
const ContactItem:React.FC<ContactItemProps> = ({
    title,
    description,
    img
}) =>{
    return (
        <div >
            <Image
                src={img}
                width={300}
                height={300}
                alt="contact"
                className="object-cover w-full h-[300px] max-h-[300px]"
            />
            <div className="text-white font-bold capitalize py-2">{title}</div>
            <div className="text-white font-light text-sm">{description}</div>
        </div>
    )
}

export default ContactItem
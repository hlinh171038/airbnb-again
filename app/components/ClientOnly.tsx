"use client"

import {useState,useEffect} from 'react'

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly:React.FC<ClientOnlyProps> = ({
    children
}) =>{
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted ){
        return null;
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default ClientOnly
"use client"

import { useCallback, useEffect, useState } from "react";

interface BodyContainerProps {
    children: React.ReactNode
}
const BodyContainer:React.FC<BodyContainerProps> = ({
    children
})=>{
    
    return <div >
            {children}
        </div>
}

export default BodyContainer
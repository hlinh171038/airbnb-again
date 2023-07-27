"use client"

import { useRouter } from "next/navigation";
import Button from "./Button";
import Header from "./Header";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?:boolean
}

const EmptyState:React.FC<EmptyStateProps> =({
    title,
    subtitle,
    showReset
}) =>{
    const router = useRouter();
    return (
        <div
            className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
            "
        >
            <Header 
                center
                title={title as string} 
                subtitle={subtitle as string}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button 
                        outline
                        label="Remove all filters"
                        onClick={()=> router.push('/')}
                    />
                )}
            </div>
        </div>
    )
}

export default EmptyState
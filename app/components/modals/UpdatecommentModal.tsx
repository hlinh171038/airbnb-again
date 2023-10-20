"use client"

import useComment from "@/app/hooks/useComment"
import Modals from "./Modals"
import CommentSession from "../comments/CommentSession"
import { SafeComment, SafeUser } from "@/app/types"
import { useEffect, useMemo, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"


interface CommentProps {
    session: SafeUser | null;
    comment: SafeComment[]
}
const UpdateCommentModal:React.FC<CommentProps> = ({
    session,
    comment=[]
}) =>{
    const commentModal = useComment()
    const [isOpen,setIsOpen] = useState(commentModal.isOpen);
   
    

    // show content and star of current comment and star
    // const currentComment = useMemo(()=>{
    //     const result = comment.find(item => item.id === id)
    // },[])

    useEffect(()=>{
        setIsOpen(commentModal.isOpen)
    },[commentModal,isOpen])
    return (
       <div className={`
       w-full
       h-[100vh]
       fixed
       bg-neutral-100/60
       z-50
       justify-center
       items-center
       ${isOpen ?"flex":"hidden"}
       `}>
            <div
                className="
                    bg-white
                    p-2
                "
            >
                <div>start</div>
                <div>comment session</div>
            </div>
       </div>
    )
}

export default UpdateCommentModal

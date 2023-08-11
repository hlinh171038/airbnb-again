"use client"

import { AiFillStar } from "react-icons/ai";
import {useState,useEffect,useCallback} from 'react'
import { SafeComment, SafeUser } from "@/app/types";
import Header from "../Header";
import useLoginModal from "@/app/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getComment } from "@/app/actions/getComment";
import CommentItem from "./CommentItem";
import { User } from "@prisma/client";
import { COMPILER_INDEXES } from "next/dist/shared/lib/constants";



interface CommentProps {
    listingId: string;
    currentUser : SafeUser | null;
    comments:SafeComment[],
    allUser: User[]
}

const CommentSession:React.FC<CommentProps> =({
    listingId,
    currentUser,
    comments=[],
    allUser=[]
}) =>{
    const [isStar, setIsStar] = useState(0);
    const [comment,setComment] =useState('');
    const [label,setLabel] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [countStar, setCountStar] = useState(0)
    const router = useRouter()

    const loginModel = useLoginModal();
   

    const starts = ['1','2','3','4','5'];

    //handle comment
    const handleComment =() =>{
        if(!currentUser)
        {
            return loginModel.onOpen()
        }

        // check have start all have comment
        if(isStar=== 0 || comment.length <=0)
        {
            toast.error("You havent chose start or comment");
            return
        }
        setIsLoading(true)
        // post comment
        axios.post('/api/comments',{
            listingId,
            userId:currentUser.id,
            label,
            description:comment,
            start:isStar
        })
        .then(()=>{
            toast.success("Commented.");
            setComment('');
            setIsStar(0);
            router.refresh();
        })
        .catch(()=>{
            toast.error("Something went wrong");
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }


    const handleFillStar =(item:string) =>{
        for(let i=0;i<6;i++)
        {
            document.getElementById(`${i}`)?.classList.remove('text-yellow-400')
        }
        let convertNum = parseInt(item);
        for(let i=1;i<=convertNum;i++)
        {
            document.getElementById(`${i}`)?.classList.add('text-yellow-400')
        }
        setIsStar(convertNum);
    }

    // handle count all star
    const handleCountAllStar = useCallback(()=>{
        let count = 0
        for(let i=0;i<comments.length;i++)
        {
            count += comments[i].start;
        }
        return count /comments.length
    },[comments])
    useEffect(() => {
        axios.get('/api/comments')
        .then((data)=>{
            console.log(data)
        })
        .catch((err:any)=>{
            console.log(err)
        })
    }, [])
    return (
        <div 
        className="
            w-full
            px-4
            py-8

        "
    >

        <div className="flex gap-2 items-center my-4">
            <div className="text-yellow-500">
                <AiFillStar size={50}/> 
            </div>
            <div>{handleCountAllStar()}</div>
            <div>{comments.length} đánh giá</div>
        </div>
        {/* start and review information */}
        <div className="font-light">Bạn đánh giá chúng tôi bao nhiêu sao</div>
        <div className="flex cursor-pointer ">
           {starts && starts.map((start)=>{
                 return <div className="start" id={start} onClick={()=>handleFillStar(start)}>
                            <AiFillStar />
                        </div>
           })}
        </div>
        {/* command */}
        <div>
           {/* command box */}
           <Header
            title="Bạn nghĩ gì về chúng tôi"
            subtitle=""
           />
           <textarea 
                onChange={(e)=>setComment(e.target.value)}
                className="
                    w-full 
                    h-[300px]
                    border-[1px]
                    shadow-md
                    px-4 
                    py-4
                    cursor-pointer
                    "
                placeholder="Để lại một vài cảm nghĩ về khách sạn của chúng tôi..."
                >
           
            </textarea>
            <div
                className="
                    flex
                    justify-end
                "
            >
                <button 
                onClick={handleComment}
                    className="
                        px-2 
                        py-2
                        text-center
                        rounded-lg
                        bg-rose-600
                        text-white
                        hover:opacity-70
                        
                    "
                >
                    Comment
                </button>
            </div>
            {/* comment session */}
            <div>
                {comments.length >0 && comments.map((comment)=>{
                    return (
                        <CommentItem
                            allUser = {allUser}
                            createdAt ={comment.createdAt}
                            description = {comment.description}
                            star = {comment.start}
                            userId = {comment.userId}
                        />
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default CommentSession
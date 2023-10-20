"use client"

import { AiFillStar } from "react-icons/ai";
import {useState,useEffect,useCallback,useMemo} from 'react'
import { SafeComment, SafeUser } from "@/app/types";
import Header from "../Header";
import useLoginModal from "@/app/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getComment } from "@/app/actions/getComment";
import CommentItem from "./CommentItem";
import { User } from "@prisma/client";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { BsDot } from "react-icons/bs";



interface CommentProps {
    listingId?: string;
    currentUser : SafeUser | null;
    comments:SafeComment[],
    allUser?: User[];
    modal?:boolean
}

const CommentSession:React.FC<CommentProps> =({
    listingId,
    currentUser,
    comments=[],
    allUser=[],
    modal
}) =>{
    const [isStar, setIsStar] = useState(0);
    const [comment,setComment] =useState('');
    const [label,setLabel] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPerPages,setCountPerPage] = useState(5);

    
    const router = useRouter()

    const loginModel = useLoginModal();
   

  
    // show comment with current id
    const commentById = useMemo(()=>{
        const result =comments.filter((item)=>item.listingId === listingId);
        return result
    },[comments,listingId])
    const starts = ['1','2','3','4','5'];

    // pagination
    const start = currentPage * countPerPages - countPerPages;
    const end = countPerPages * currentPage;

    const pagin = [];
    for(let i=0;i<Math.ceil(commentById.length/countPerPages);i++)
    {
        pagin.push(i)
    }
    // handle change pagination
    const handlePagination = useCallback((e:any,p: any)=>{
        setCurrentPage(p)
    },[])
    // post comment
    const handleComment = useCallback(()=>{
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
            setIsLoading(false);
            setComment('');
            setIsStar(0);
        })
    },[currentUser,loginModel,isStar,comment,router,label,listingId])

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
        if(commentById.length === 0)
        {
            return 0;
        }
        let count = 0
        for(let i=0;i<commentById.length;i++)
        {
            count += commentById[i].start;
        }
        return (count /commentById.length).toFixed(2)
    },[commentById])
  
    
    return (
        <div 
        className="
            w-full
            py-8
        "
        >
        <div className="flex items-end my-4 ">
            <div className="text-yellow-500">
                <AiFillStar size={50}/> 
            </div>
            <div className="font-semibold flex items-center">{handleCountAllStar()}</div>
            
            <div className="text-sm underline flex"><BsDot/>{commentById.length} đánh giá</div>
        </div>
        {/* start and review information */}
        <div className="font-light text-sm">Bạn đánh giá chúng tôi bao nhiêu sao ?</div>
        <div className="flex cursor-pointer ">
           {starts && starts.map((start)=>{
                 return <div key={start} className="start" id={start} onClick={()=>handleFillStar(start)}>
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
                className={`
                w-full 
               
                border-[1px]
                shadow-md
                px-2
                py-2
                cursor-pointer
                text-sm
                font-light
                 ${modal ? "h-[100px]":"h-[300px]"}
                `}
                placeholder="Để lại một vài cảm nghĩ về khách sạn của chúng tôi..."
                >
           
            </textarea>
            <div
                className="
                    flex
                    justify-end
                    mb-4
                "
            >
                <button 
                onClick={handleComment}
              
                    className={`
                        px-2 
                        py-2
                        text-center
                        rounded-lg
                        bg-rose-600
                        text-white
                        hover:opacity-70
                        ${isLoading &&"cursor-not-allowed opacity-75"}
                    `}
                >
                    Comment
                </button>
            </div>
            {/* comment session */}
            <div className=" h-auto">
                {commentById.length >0 && commentById.slice(start,end).map((comment)=>{
                    return (
                        <CommentItem
                            key={comment.id}
                            allUser = {allUser}
                            createdAt ={comment.createdAt}
                            description = {comment.description}
                            star = {comment.start}
                            userId = {comment.userId}
                            id={comment.id}
                            currentUser = {currentUser}
                        />
                    )
                })}
            </div>
            <Stack spacing={2} className={`mt-3 mb-3  ${commentById.length >0 ?"flex justify-end":"hidden"}`}>
                    <Pagination count={pagin.length} variant="outlined" shape="rounded" className="flex justify-end" onChange={handlePagination}/>
            </Stack>
        </div>
    </div>
    )
}

export default CommentSession
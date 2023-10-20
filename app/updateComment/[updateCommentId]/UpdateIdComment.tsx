"use client"

import Header from "@/app/components/Header"
import { SafeComment } from "@/app/types"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState, useCallback } from "react"
import toast from "react-hot-toast"
import { AiFillStar } from "react-icons/ai"
import { start } from "repl"


interface UpdateIdCommentProps {
    comment: SafeComment[] | null
}
const UpdateIdComment:React.FC<UpdateIdCommentProps> = ({
    comment = [],
}) =>{
    const params = useParams();
    const id = params.updateCommentId;
    const router = useRouter();
    const [commentContent, setCommentContent] = useState('');
    const [loading,setLoading] = useState(false);

    

    const commentById = useMemo(()=>{
        const result = comment?.find(item =>item.id === id)
        if(result){
            return result
        }else {
             return null
        }
    },[comment, id])

    const [isStar,setIsStar] = useState(commentById?.start);

    //update comment session
    const handleUpdateComment = useCallback(()=>{
        setLoading(true);
        
        if(commentContent === '') {
            toast.error('Viết bình luận !!!')
        } else {
            axios.post('/api/updateComment',{start:isStar, description:commentContent, id:id})
                .then(()=>{
                    toast.success('Cập nhật thành công !!!');
                    router.push(`/listings/${commentById?.listingId}`)
                    router.refresh()
                    
                })
                .catch((err)=>{
                    toast.error(err)
                })
                .finally(()=>{
                    setLoading(false)
                   
                })
        }
        
    },[isStar,commentContent,router,commentById?.listingId, id])
    // show star
    const showStar = useMemo(()=>{
       
        let result = []
        if(commentById){
            for(let i=1; i<=5;i++){
                if(i <= commentById?.start){
                    result.push({style:'text-yellow-400',index:i})
                }else{
                    result.push({style:'text-yellow-400',index:i})
                }
            }
        } 
        return result
    },[commentById])

    // handle fill start
    const handleFillStar =(item:number) =>{
        for(let i=0;i<6;i++)
        {
            document.getElementById(`${i}`)?.classList.remove('text-yellow-400')
        }
       
        for(let i=1;i<=item;i++)
        {
            document.getElementById(`${i}`)?.classList.add('text-yellow-400')
        }
        setIsStar(item);
    }

    console.log(commentById)
    console.log(showStar)
    return (
        <div className={`
        w-full
        h-[100vh]
        fixed
        bg-neutral-600/60
        z-50
        flex
        justify-center
        items-center
        `}>
             <div
                 className="
                     bg-white
                     w-full
                     md:w-1/2
                     p-2
                     ml-2
                     mr-2
                 "
             >
                <div className="uppercase font-bold text-center mt-4 mb-4">Cập nhật bình luận </div>
                 <div className="font-light text-sm">Bạn đánh giá chúng tôi bao nhiêu sao ?</div>
                    <div className="flex cursor-pointer ">
                        {showStar.map(item =>{
                           return  <div id={`${item.index}`} key={item.index} className={`${item.style}`} onClick={() =>handleFillStar(item.index as number)}><AiFillStar/></div>
                        })}
                    </div>
                 <div>
                 <Header
                    title="Bạn nghĩ gì về chúng tôi"
                    subtitle=""
                />
                <textarea 
                        onChange={(e)=>setCommentContent(e.target.value)}
                        className={`
                        w-full 
                    
                        border-[1px]
                        shadow-md
                        px-2
                        py-2
                        cursor-pointer
                        text-sm
                        font-light
                       
                        `}
                        placeholder={commentById?.description}
                        >
                            {commentById?.description} 
                    </textarea>
                 </div>
                 {/* button */}
                 <div className="flex justify-between items-center mt-4 mb-4">
                        <div className={`text-sm bg-none border-1 hover:text-neutral-500 text-neutral-600 rounded-md p-2  ${loading ?"cursor-not-allowed":"cursor-pointer"}`}  onClick={()=>router.push(`/listings/${commentById?.listingId}`)}>Trở lại</div>
                        <div className={`text-sm bg-rose-600 hover:bg-rose-500 text-center text-white rounded-md p-2  ${loading ?"cursor-not-allowed":"cursor-pointer"}`} onClick={handleUpdateComment}>Cập nhật</div>
                 </div>
             </div>
        </div>
    )
}

export default UpdateIdComment
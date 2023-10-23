"use client"

import {useMemo,useCallback,useState} from 'react';
import { User } from "@prisma/client";
import Image from "next/image";
import { SafeUser } from '@/app/types';
import { AiFillStar } from 'react-icons/ai';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useLoginModal from '@/app/hooks/useLoginModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import useComment from '@/app/hooks/useComment';
import { useRouter } from 'next/navigation';


interface CommentItemProps {
    description: string;
    star:number;
    createdAt: string;
    allUser: User[];
    userId: string;
    currentUser: SafeUser | null;
    id: string;
}
const CommentItem:React.FC<CommentItemProps> = ({
    description,
    star,
    createdAt,
    userId,
    allUser =[],
    currentUser,
    id
}) =>{
    const [isReadMore,setIsReadMore] = useState(false)
    const [isOpen,setIsOpen] = useState(false);
    const [toggle, setToggle] = useState(true);
    const loginModel = useLoginModal()
    const commentModal = useComment()
    const router = useRouter()

    const checkImage = useCallback((item:any) => {
        for(let i=0;i<allUser.length;i++)
        {
            if(allUser[i].id === item){
                return allUser[i].image
            }
        }
        return '/placeholder.jpg'
    }, [allUser]);

    const checkName = useCallback((item:any)=>{
        for(let i=0;i<allUser.length;i++)
        {
            if(allUser[i].id === item){
                return allUser[i].name
            }
        }
        return 'Anonymos'
    },[allUser])

    // handle star
    const handleStar = useCallback((number:number)=>{
        const star = []
        for(let i=1;i<=5;i++)
        {
            if(i<=number){
                star.push({style:'text-yellow-400',id:i}) 
            }else{
                star.push({style:'text-neutral-400',id:i}) 
            }
        }
        return star
    },[])
    //handle read more
    const handleReadMore = useCallback(()=>{
        setIsReadMore(!isReadMore);
    },[isReadMore])

    //handle toggle comment
    const handleToggleComment = useCallback(()=>{
        setToggle(!toggle)
    },[toggle])

    // handle delete comment
    const handleDeleteComment = useCallback(()=>{
        if(!currentUser){
            loginModel.onOpen()
        }
        // check if this is your comment
        if(userId === currentUser?.id){
            axios.post(`/api/deletecomment`,{id})
            .then(()=>{
                toast.success('Đã xóa')
            })
            .catch(()=>{
                toast.error('Xảy ra lỗi, thử lại sau !!!')
            })
        }else {
            toast.error("không thể xóa bình luận người khác")
        }
    },[currentUser,id,loginModel,userId])

    // handle update comment
    const handleUpdateComment = useCallback(()=>{
        if(!currentUser){
            loginModel.onOpen()
        }
        // check if this is your comment
        if(userId === currentUser?.id){
            router.push(`/updateComment/${id}`)
        }else {
            toast.error('Không thể cập nhật bình luận người khác !!!')
        }
    },[currentUser,loginModel,userId,id, router])
    return (
        <div className='mb-4'>
            {/* header */}
            <div
                className='
                    flex
                    justify-between
                    items-center
                '
            >
                <div className='flex justify-between items-center'>
                    <Image
                        src={checkImage(userId ) as string}
                        alt="Avatar"
                        width={50}
                        height={50}
                        className='rounded-full '
                    />
                    <div>
                        <div className='font-bold px-2'>{checkName(userId)}</div>
                        <div className='text-sm font-light px-2'>
                            {new Date(createdAt).getDate()} thg
                            {new Date(createdAt).getMonth() + 1}-
                            {new Date(createdAt).getFullYear()}
                        </div>
                    </div>
                </div>
                <div className='relative'>
                   <MoreVertIcon className='text-neutral-600 hover:text-neutral-400 cursor-pointer' onClick={handleToggleComment}/>
                   <div className={`bg-neutral-100 text-neutral-600 text-sm p-1 transition-all duration-300 ${toggle ? "hidden":"absolute top-6 right-1 w-max"}`}>
                    <div className='cursor-pointer text-sm hover:text-neutral-600' onClick={handleDeleteComment}>Xóa bình luận</div>
                    <div className='cursor-pointer text-sm hover:text-neutral-600' onClick={handleUpdateComment}>Cập nhật </div>
                   </div>
                </div>
            </div>
            <div className='px-12 py-2 flex'>
                {handleStar(star).map((item)=>{
                    return (
                        <div key={item.id} className={item.style}><AiFillStar/></div>
                    )
                })}
            </div>
            <div className='
                    w-full 
                    h-auto
                    min-h-[80px] 
                    border-[1px] 
                    px-4 
                    py-4 
                    rounded-lg
                    font-light
                    text-sm
                    overflow-hidden
                    '
                    >
                {description.length>235 ? isReadMore? description: description.substring(0,235) +'...': description}
                {description.length>235 ?(isReadMore?(
                    <span
                        onClick={handleReadMore}
                        className='underline text-sm font-bold ml-2 cursor-pointer'
                    >Thu nhỏ</span>
                ):
                (<span
                    onClick={handleReadMore}
                    className='underline text-sm font-bold cursor-pointer'
                >Đọc thêm</span>)
                ):""}
            </div>
        </div>
    )
}
export default CommentItem
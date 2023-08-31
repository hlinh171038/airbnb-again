"use client"

import axios from "axios"
import Header from "../Header"
import {useEffect,useState} from 'react'
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { FcLock } from "react-icons/fc"
import { AiFillTool } from "react-icons/ai"
import { GiShare } from "react-icons/gi"
import { Information } from "@prisma/client"
import { toast } from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"


interface InformationAccountProps {
    information: Information | null
}
const InformationAccount:React.FC<InformationAccountProps> =({
    information
}) =>{
    const [info,setInfo] = useState(false);
    const router = useRouter()
    const params = useSearchParams()
    console.log(info)
    useEffect(() => {
        if(information){
            setInfo(true)
        }else {
            setInfo(false)
        }
    }, [])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
            defaultValues:{
               name:"",
               email: "",
               phone: '',
               address: '',
               emerency:""
            }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/information',data)
            .then(()=>{
                toast.success('Created.');
                router.refresh()
            })
            .catch((err)=>{
                toast.error(err)
            })
      }
    return (
        <div>
            <Header
                title="Thông tin cá nhân"
                subtitle={info ?"Bạn đã tạo thông tin cá nhân":""}
                center
               
            />
            <div 
                className="
                    grid
                    gird-cols-1
                    md:grid-cols-3
                    gap-4
                    py-8
                "
            >
                <div className="col-span-2">
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className="
                            flex
                            flex-col
                            justify-center
                            gap-4
                        "
                        >
                        {/* register your input into the hook by invoking the "register" function */}
                        <label htmlFor="name" className="text-sm font-light ">Tên pháp lí</label>
                        <input 
                            id="name" 
                            {...register("name",{required: true})} 
                            placeholder="Tên" 
                            className="text-[0.8rem] border-[1px] rounded-md border-neutral-600 px-4 py-2"
                        />

                        <label htmlFor="email" className="text-sm font-light ">Địa chỉ Email</label>
                        <input 
                            defaultValue="linh thai" 
                            id="email" {...register("email")}  
                            placeholder="Email"
                             className="text-[0.8rem] border-[1px] rounded-md border-neutral-600 px-4 py-2"
                        />

                        <label htmlFor="phone" className="text-sm font-light ">Số điện thoại</label>
                        <input  
                            id="phone" 
                            {...register("phone")}  
                            placeholder="Số điện thoại"
                             className="text-[0.8rem] border-[1px] rounded-md border-neutral-600 px-4 py-2"
                        />

                        <label htmlFor="address" className="text-sm font-light ">Địa chỉ</label>
                        <input  
                            id="address" 
                            {...register("address")}  
                            placeholder="Địa chỉ"
                             className="text-[0.8rem] border-[1px] rounded-md border-neutral-600 px-4 py-2"
                        />

                        <label htmlFor="emerency" className="text-sm font-light ">Liên hệ trường hợp khẩn cấp</label>
                        <input  
                            id="emerency" 
                            {...register("emerency")}  
                            placeholder="Liên hệ trường hợp khẩn cấp"
                             className="text-[0.8rem] border-[1px] rounded-md border-neutral-600 px-4 py-2"
                        />

                        <input 
                            type={!info ?'submit':"button"}
                            value="Tạo thông tin trên Airbnb" 
                            className={`
                                px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-500 capitalize 
                                ${info ?"cursor-not-allowed":"cursor-pointer"}
                            `}/>
                    </form>
                </div>
                <div
                    className="
                        border-[1px]
                        border-neutral-400
                        rounded-md
                        px-4
                        py-4
                        col-span-2
                        md:col-span-1
                    "
                >
                    <div className="flex flex-col gap-4 border-b-[1px] pb-4">
                        <div>
                            <FcLock size={40}/>
                        </div>
                        <div>
                            <div className="font-bold text-md ">không hiển thị thông tin ở đây</div>
                            <div className="text-[0.8rem] text-neutral-600 font-light">Chỉ có bạn mới được thấy thông tin bảo mật này</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border-b-[1px] py-4 ">
                        <div>
                            <AiFillTool size={40} className="text-neutral-400"/>
                        </div>
                        <div>
                            <div className="font-bold text-md ">Bạn có thể cập nhật thông tin</div>
                            <div className="text-[0.8rem] text-neutral-600 font-light">
                                Cập nhật lại thông tin miễn phí 
                                <span 
                                    onClick={()=>router.push('informations?category=cập%20nhật')}
                                    className="underline hover:opacity-[0.5] cursor-pointer px-2"
                                >
                                    tại đây
                                </span> trên Airbnb.
                            </div>
                            <div className="text-[0.8rem] text-neutral-600 font-light">
                                Bạn có thể chỉnh sửa thông tin liên hệ và thông tin cá nhân. Nếu sử dụng thông tin này để xác minh danh tính, bạn sẽ cần phải xác minh lần nữa vào lần đặt tiếp theo, hoặc để tiếp tục đón tiếp khách.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border-b-[1px] py-4 ">
                        <div>
                            <GiShare size={40} className="text-rose-400"/>
                        </div>
                        <div>
                            <div className="font-bold text-md ">Bạn có thể chia sẻ </div>
                           
                            <div className="text-[0.8rem] text-neutral-600 font-light">
                            Airbnb chỉ tiết lộ thông tin liên lạc cho Chủ nhà/Người tổ chức và khách sau khi đặt phòng/đặt chỗ được xác nhận.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformationAccount
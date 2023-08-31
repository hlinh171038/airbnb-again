"use client"

import { Information } from "@prisma/client"
import { useRouter } from "next/navigation"

import { AiFillTool } from "react-icons/ai"
import { FcLock } from "react-icons/fc"
import { GiShare } from "react-icons/gi"

interface InformationPersonProps {
    information: Information | null 
}

const InformationPerson:React.FC<InformationPersonProps> = ({
    information
}) =>{
    const router = useRouter()
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 py-2 md:py-8">
            <div className="col-span-1 md:col-span-2 flex flex-col gap-4 mb-8 md:mt-8">
                <div className="flex items-center">
                    <div className="text-sm font-bold">Tên pháp lý :</div>
                    <div className="text-sm font-light">{information?.name}</div>
                </div>
                <div className="flex items-center">
                    <div className="text-sm font-bold">Email :</div>
                    <div className="text-sm font-light">{information?.email}</div>
                </div>
                <div className="flex items-center">
                    <div className="text-sm font-bold">Số điện thoại :</div>
                    <div className="text-sm font-light">{information?.phone}</div>
                </div>
                <div className="flex items-center">
                    <div className="text-sm font-bold">Địa chỉ hiện tại :</div>
                    <div className="text-sm font-light">{information?.address}</div>
                </div>
                <div className="flex items-center">
                    <div className="text-sm font-bold">Liên hệ khuẩn cấp :</div>
                    <div className="text-sm font-light">{information?.emerency}</div>
                </div>
            </div>
            <div
                    className="
                        border-[1px]
                        border-neutral-400
                        rounded-md
                        px-4
                        py-4
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
                                    className="underline hover:opacity-[0.5] cursor-pointer px-2">tại đây</span> trên Airbnb.
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
    )
}

export default InformationPerson    
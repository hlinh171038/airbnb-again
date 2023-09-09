"use client"

import Image from "next/image"
import Header from "../components/Header"
import { SafeUser } from "../types"
import { BiSolidRightArrowAlt } from "react-icons/bi"
import { RxAvatar, RxQuestionMarkCircled } from "react-icons/rx"
import { MdOutlineManageAccounts } from "react-icons/md"
import { BsDot, BsShieldFillExclamation, BsToggles } from "react-icons/bs"
import { LuHeadphones } from "react-icons/lu"
import { FaAirbnb } from "react-icons/fa"
import { TbCircleLetterC } from "react-icons/tb"
import { AiOutlineGlobal } from "react-icons/ai"
import { useRouter } from "next/navigation"


interface ClientProfileProps {
    currentUser: SafeUser | null
}
const ClientProfile:React.FC<ClientProfileProps> = ({
    currentUser
}) =>{
    const router = useRouter()
    return (
        <div className="mb-16">
            {/* header */}
            <div className="w-full h-auto relative ">
                    <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
                        <Header
                            title="Hồ sơ cá nhân"
                            subtitle="Quản lí hồ sơ cá nhân với Airbnb.com  "
                            big
                            center
                            white
                        />
                    </div>
                    <Image
                        src="/profile-01.webp"
                        width={1000}
                        height={1000}
                        alt="trips"
                        objectPosition="top"
                        className="w-full h-[300px] object-cover "
                    />
            </div>
            {/* content */}
            <div className="flex flex-col gap-6 px-4 py-4">
                <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex gap-2">
                        <Image
                            src={currentUser  ? currentUser.image as string : `/placeholder.webp`}
                            width={50}
                            height={50}
                            alt="avatar"
                            className="rounded-full "
                        />
                    
                    <div className="flex flex-col justify-center items-center gap-1 text-sm font-light">
                        <div>{currentUser ? currentUser?.name : "Đăng nhập"}</div>
                        <div>Hiển thị hồ sơ</div>
                        
                    </div>
                    </div>
                    <div>
                        <BiSolidRightArrowAlt />
                    </div>
                </div>
                <hr/>
                    {/* rent */}
                <div 
                    onClick={()=>router.push('/rent2')}
                    className="rounded-md shadow-md flex items-center gap-4 my-4 border-[2px] px-4 py-2">
                    <div>
                        <div className="text-sm font-bold">Cho thuê nhà trên Airbnb</div>
                        <div className="text-sm font-light">Thiết lập và bắt đầu kiếm tiền thật đơn giản.</div>
                        
                    </div>
                    <div>
                        <Image 
                            src="/house-03.webp"
                            width={100}
                            height={100}
                            alt="house"
                        />
                    </div>
                </div>
                {/* information */}
                <div className="flex justify-between items-center gap-2">
                    <div className="flex  gap-1 items-center justify-center">
                        <div><RxAvatar size={30}/></div>
                        <div className="text-sm font-light">Thông tin cá nhân</div>
                    </div>
                    <div>
                        <BiSolidRightArrowAlt />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex  gap-1 items-center justify-center">
                        <div><MdOutlineManageAccounts size={30}/></div>
                        <div className="text-sm font-light">Tài khoản</div>
                    </div>
                    <div>
                        <BiSolidRightArrowAlt />
                    </div>
                </div>
                <hr/>
                {/* rents */}
                <div className="flex flex-col gap-2">
                    <div>Cho thuê</div>
                        <div className="flex justify-between items-center gap-2">
                        <div className="flex  gap-1 items-center justify-center">
                            <div><BsToggles size={30}/></div>
                            <div className="text-sm font-light">Quản lí phòng, nhà cho thuê của bạn.</div>
                        </div>
                        <div>
                            <BiSolidRightArrowAlt />
                        </div>
                    </div>
                </div>
                <hr />
                {/* support */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex  gap-1 items-center justify-center">
                            <div><RxQuestionMarkCircled size={30}/></div>
                            <div className="text-sm font-light">Truy cập trung tâm trợ giúp.</div>
                        </div>
                        <div>
                            <BiSolidRightArrowAlt />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex  gap-1 items-center justify-center">
                            <div><BsShieldFillExclamation size={30}/></div>
                            <div className="text-sm font-light">Truy cập trung tâm trợ giúp.</div>
                        </div>
                        <div>
                            <BiSolidRightArrowAlt />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex  gap-1 items-center justify-center">
                            <div><LuHeadphones size={30}/></div>
                            <div className="text-sm font-light">Báo cáo lo ngại của hàng xóm.</div>
                        </div>
                        <div>
                            <BiSolidRightArrowAlt />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex  gap-1 items-center justify-center">
                            <div><FaAirbnb size={30}/></div>
                            <div className="text-sm font-light">Phương thức hoạt động của Airbnb.</div>
                        </div>
                        <div>
                            <BiSolidRightArrowAlt />
                        </div>
                    </div>
                </div>
                <hr/>
                {/* footer */}
                <div>
                    <div className="flex items-center gap-2 text-sm"> 
                        <div><AiOutlineGlobal/></div>
                        <div>Tiếng Việt (VN)</div>
                    </div>
                    <div className="rounded-md flex items-center justify-center border-[1px] py-2 ">Đăng xuất</div>
                    <div className="my-4">
                        <div className="flex justify-center text-[0.8rem]">
                            <div>Trợ giúp & hỗ trợ</div>
                            <div className="flex items-center"><BsDot/></div>
                            <div>Điều khoản</div>
                            <div className="flex items-center"><BsDot/></div>
                            <div>Chính sách</div>
                        </div>
                        <div className="flex items-center text-[0.6rem] justify-center ">
                        <div> <TbCircleLetterC/></div>
                        <div> {new Date().getFullYear()} Airbnb, Inc, Bảo lưu mọi quyền.</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ClientProfile
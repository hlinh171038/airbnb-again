"use client"

import { AiFillTwitterSquare, AiOutlineCopyrightCircle, AiOutlineGlobal } from "react-icons/ai"
import { BsDot } from "react-icons/bs"
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa"
import Container from "./Container"

const Footer = () =>{
    return (
        <div className="bg-neutral-100 mt-10 px-0 xl:px-20 md:px-10 sm:px-2">
            <div>
                <div 
                    className="
                        grid
                        grid-cols-1                       
                        lg:grid-cols-4
                        gap-4
                        p-4
                        font-light
                        text-[0.8rem]
                        my-6
                    "   
                >
                    <div className=" transition block md:flex flex-col gap-2 cursor-pointer">
                        <div className="font-bold my-4 cursor-default">Hổ trợ</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                            <div className="hover:underline">Trung tâm trợ giúp.</div>
                            <div className="hover:underline">Yêu cầu trợ giúp vấn đề an toàn.</div>
                            <div className="hover:underline">AirCover.</div>
                            <div className="hover:underline">Hổ trợ người khuyết tật.</div>
                            <div className="hover:underline">Các tùy chọn hủy.</div>
                            <div className="hover:underline">Báo cáo lo ngại hàng xóm.</div>
                        </div>
                    </div>
                    <div className=" transition flex flex-col gap-2 cursor-pointer">
                        <div className="font-bold my-4 cursor-default">Cộng đồng</div>
                        <div className="hover:underline">Airbnb.org:nhà ở cứu trợ.</div>
                        <div className="hover:underline">Chống phân biệt đối xử.</div>
                    </div>
                    <div className=" transition flex flex-col gap-2 cursor-pointer">
                        <div className="font-bold my-4 cursor-default">Đón tiếp khách</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                            <div className="hover:underline">Cho thuê nhà trên Airbnb.</div>
                            <div className="hover:underline">Airbnb cho chủ nhà.</div>
                            <div className="hover:underline">Xem tài nguyên đón tiếp khách.</div>
                            <div className="hover:underline">Đón tiếp khách có trách nhiệm.</div>
                        </div>
                    </div>
                    <div className=" transition flex flex-col gap-2 cursor-pointer">
                        <div className="font-bold my-4 cursor-default">Airbnb</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                            <div className="hover:underline">Trang tin tức.</div>
                            <div className="hover:underline">Tìm hiểu các tính năng mới.</div>
                            <div className="hover:underline">Thư ngỏ từ các nhà sáng lập.</div>
                            <div className="hover:underline">Cơ hội nghề nghiệp.</div>
                            <div className="hover:underline">Nhà đầu tư.</div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="flex items-center justify-between px-2 text-[.8rem] font-light py-4">
                    <div className="flex sm:hidden md:flex justify-start items-center">
                        <AiOutlineCopyrightCircle/>
                        <div className="cursor-default"> {new Date().getFullYear()} Airbnb, Inc.</div>
                        <BsDot />
                        <div className="hover:underline transition cursor-pointer">Quyền riêng tư</div>
                        <BsDot />
                        <div className="hover:underline transition cursor-pointer">Diều khoản</div>
                        <BsDot />
                        <div className="hover:underline transition cursor-pointer">Sơ đồ trang web</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center hover:underline transition cursor-pointer">
                            <AiOutlineGlobal/>
                            <div>Tiếng Việt (VN)</div>
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <div className="hover:text-blue-800 transition"><FaFacebookSquare/></div>
                            <div className="hover:text-blue-600 transition"><AiFillTwitterSquare/></div>
                            <div className="hover:text-rose-600 transition"><FaInstagramSquare/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
"use client"

import Image from "next/image"
import RentContent from "./RentContent"

const RentHeader = () =>{
    return (
        <div className="flex flex-col gap-3 w-full">
            <span className="text-center text-semibold text-2xl md:text-4xl ">Dễ dàng cho thuê nhà trên Airbnb với Airbnb Setup</span>
            <Image
                src="/setup.jpeg"
                alt="SetUp"
                width={600}
                height={600}
                className="w-full object-cover h-[400px] bg-neutral-100/60"
            />
            <div className=" block sm:flex flex-row justify-between items-start gap-7 ">
                <RentContent
                    title="Nhận sự hướng dẫn riêng từ một Chủ nhà siêu cấp"
                    content="Chúng tôi sẽ kết nối bạn với một Chủ nhà siêu cấp trong khu vực của bạn, người sẽ hướng dẫn bạn từ câu hỏi đầu tiên cho đến vị khách đầu tiên – qua điện thoại, cuộc gọi video hoặc tính năng trò chuyện."
                    bold
                />
               <RentContent
                    title="Vị khách có kinh nghiệm cho lượt đặt phòng đầu tiên của bạn"
                    content="Với lượt đặt phòng đầu tiên, bạn có thể lựa chọn chào đón một khách có kinh nghiệm, đã có ít nhất 3 kỳ ở và lịch sử hoạt động tốt trên Airbnb."
                    bold
                />
                <RentContent
                    title="Hỗ trợ đặc biệt từ Airbnb"
                    content="Chỉ cần nhấn nút là Chủ nhà mới có thể liên hệ với nhân viên Hỗ trợ cộng đồng được đào tạo đặc biệt, có thể trợ giúp về mọi vấn đề, từ sự cố tài khoản cho đến hỗ trợ thanh toán."
                    bold
                />
            </div>
        </div>
    )
}

export default RentHeader
"use client"

import Header from "../Header"

interface ListingProps {
    guestCount: number;
    utilities: string[];
}


const ListingRule:React.FC<ListingProps> = ({
    guestCount,
    utilities
}) =>{
    // console.log(utilities)
    return (
        <div className="px-2">
            <div
                className="
                    mb-4
                "
            >
                <Header 
                    title="Những điều cần biết"
                    subtitle=""
                    
                />
            </div>
           <div>
           <div 
            className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-2
                md:gap-4
                text-sm
                font-light
            "
        >
            <div className="text-sm font-light flex flex-col gap-2 mt-2 mb-2">
                    <div className="font-bold ">Nội qui nhà </div>
                    <div>Nhận phòng sau 16:00.</div>
                    <div>Trả phòng trước 11:00.</div>
                    <div>Tối đa {guestCount} khách.</div>
                </div>
                <div className="text-sm font-light flex flex-col gap-2 mt-2 mb-2">
                    <div className="font-bold">Thiết bị bảo đảm an toàn</div>
                    <div>Hồ bơi hoặc bồn tắm không có cổng hoặc không khóa</div>
                    {utilities.find((utility)=>utility ==='Máy báo khói')?<div>Máy báo khói</div>:<div className="line-through">Máy báo khói</div>}
                    {utilities.find((utility)=>utility ==='bộ sơ cứu')?<div>Bộ sơ cứu</div>:<div className="line-through">Bộ sơ cứu</div>}
                    {utilities.find((utility)=>utility ==='Bình chữa cháy')?<div>Bình chữa cháy</div>:<div className="line-through">Bình chữa cháy</div>}
                    {utilities.find((utility)=>utility ==='Máy phát hiện khí CO')?<div>Máy phát hiện khí CO</div>:<div className="line-through">Máy phát hiện khí CO</div>}
                </div>
                <div className="text-sm font-light flex flex-col gap-2 mt-2 mb-2">
                    <div className="font-bold">Chính sách hủy</div>
                    <div>Hủy miễn phí trong vòng 48 h </div>
                    <div>Hãy đọc toàn bộ chính sách hủy của Chủ nhà/Người tổ chức được áp dụng ngay cả khi bạn hủy vì ốm bệnh hoặc gián đoạn do dịch COVID-19.</div>
                </div>
            </div>
        </div>
</div>
)}

export default ListingRule
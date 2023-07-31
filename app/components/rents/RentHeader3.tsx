"use client"

import RentPopUp from "./RentPopUp"

const RentHeader3 =() =>{
    return (
        <div className="py-6">
            <span className="text-2xl md:text-3xl font-semibold">Giải đáp thắc mắc của bạn</span>
            <RentPopUp
                label="Chỗ của tôi có phù hợp để cho thuê trên Airbnb không?"
                content="Khách của Airbnb quan tâm đến mọi loại chỗ ở. Chúng tôi có các mục cho thuê nhà nhỏ, cabin, nhà trên cây và rất nhiều loại hình chỗ ở khác. Ngay cả một căn phòng trống cũng có thể trở thành nơi ở tuyệt vời."
            />
             <RentPopUp
                label="Tôi có phải đón tiếp khách toàn bộ thời gian không?"
                content="Hoàn toàn không – bạn được toàn quyền kiểm soát lịch của mình. Bạn có thể cho thuê một lần mỗi năm, vài đêm mỗi tháng hoặc thường xuyên hơn."
            />
            <RentPopUp
                label="Tôi nên tương tác với khách ở mức độ nào?"
                content="Điều này là do bạn quyết định. Nếu như một số Chủ nhà chỉ muốn nhắn tin cho khách vào những thời điểm quan trọng – như gửi một lời nhắn ngắn gọn khi khách nhận phòng, những người khác lại thích được đích thân gặp gỡ khách. Bạn sẽ tìm thấy phong cách phù hợp với mình và khách."
            />
            <RentPopUp
                label="Airbnb có mẹo nào giúp tôi trở thành Chủ nhà Airbnb tuyệt vời không?"
                content="Việc nắm được thông tin cơ bản giúp ích rất nhiều cho bạn. Hãy giữ chỗ ở của bạn sạch sẽ, phản hồi khách kịp thời và cung cấp các tiện nghi thiết yếu, như khăn tắm mới giặt chẳng hạn. Một số Chủ nhà thích thêm dấu ấn cá nhân, chẳng hạn như bài trí hoa tươi hoặc chia sẻ danh sách các điểm đến đáng khám phá ở địa phương – nhưng đây không phải là yêu cầu bắt buộc."
            />
            <RentPopUp
                label="Airbnb thu những khoản phí gì?"
                content="Airbnb thường thu một khoản phí dịch vụ cố định bằng 3% tổng phụ trong số tiền đặt phòng khi bạn được thanh toán. Chúng tôi cũng thu phí từ khách khi họ đặt phòng. Ở nhiều khu vực, Airbnb cũng thay mặt bạn tự động thu và nộp thuế bán hàng và du lịch."
            />
        </div>
    )
}

export default RentHeader3
"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const article = [
    {
        title:"Yêu cầu hoàn tiền",
        content:"Việc hoàn tiền nên được thực hiện dễ dàng. Bạn có thể yêu cầu hoàn tiền trong Trung tâm..."
    },
    {
        title:"Các loại thuế cho khách",
        content:"Có thể bạn chỉ muốn được an tâm hơn trước khi đặt phòng, cũng có thể lúc này bạn đang..."
    },
    {
        title:"Qui trình hủy",
        content:"Đôi khi mọi thứ phát sinh và bạn phải hủy bỏ. Để mọi thứ diễn ra suôn sẻ, đây là cách bạn có thể hủy đặt chỗ, hãy tìm hiểu.."
    },
    {
        title:"Hoàn tiền tự động",
        content:"Các khoản hoàn trả đủ điều kiện sẽ được xử lý ngay sau khi bạn nhấp vào hủy bỏ. Chúng tôi tự động xử lý khoản tiền hoàn lại thông qua phương thức thanh toán bạn đã sử dụng..."
    },
    {
        title:"Kiểm tra trạng thái đặt phòng/đặt chỗ của bạn với tư cách là khách",
        content:"Trạng thái đặt trước của bạn giúp bạn cập nhật mọi thứ, chẳng hạn như liệu bạn đã được xác nhận hay cần thực hiện điều gì đó như ..."
    },
    {
        title:"Tìm chính sách hủy cho đặt phòng của bạn",
        content:"Có thể bạn chỉ muốn được an tâm hơn trước khi đặt phòng, cũng có thể lúc này bạn đang ..."
    }
]

    export const caroselArr = [
    {
        id:'1',
        title:"bắt đầu trên Airbnb",
        subtitle:"Quy trình xác minh danh tính giúp chúng tôi xác nhận rằng đó đúng là bạn. Đây là một trong những cách giúp chúng tôi đảm bảo an toàn trên Airbnb",
        img:"/carosel-01.jpeg",
        content:"Miễn là bạn nhập điểm đến, ngày đi và số lượng khách khi tìm kiếm trên Airbnb, tất cả danh sách hiển thị sẽ có sẵn. Để đảm bảo không gian vừa phải, hãy sử dụng các bộ lọc tìm kiếm để tìm một địa điểm hoàn toàn dành cho chính bạn hoặc các tùy chọn khác nếu bạn muốn một số không gian chung. Một khi bạn tìm thấy một nơi bạn thích, bạn có thể vẫn còn thắc mắc về nó. Mặc dù không thể đến thăm chỗ nghỉ trước khi đặt phòng, nhưng bạn có thể liên hệ với Chủ nhà để tìm hiểu thêm. Ngoài ra, hãy hỏi họ về các tiện nghi cụ thể, vùng lân cận hoặc địa điểm vì họ là nguồn tốt nhất cho tất cả các chi tiết. Họ thậm chí có thể gửi cho bạn chấp thuận trước hoặc ưu đãi đặc biệt để lôi kéo bạn đặt chỗ của họ.",
        category:"guest"
    },
    {
        id:'2',
        title:"bắt đầu trên Airbnb",
        subtitle:"Quy trình xác minh danh tính giúp chúng tôi xác nhận rằng đó đúng là bạn. Đây là một trong những cách giúp chúng tôi đảm bảo an toàn trên Airbnb",
        img:"/carosel-02.jpeg",
        category:"guest"
    }
]
const ContactMenuMain =() =>{
    const router = useRouter()
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <div>
            {/* carosel */}
            <div className='my-4'>
                <Carousel responsive={responsive} >
                {caroselArr.map((item)=>{
                    return <div className='px-2 shadow-md' key={item?.title}>
                                <Image
                                    src={item.img}
                                    alt="carosel"
                                    width={400}
                                    height={400}
                                    className='
                                        object-cover
                                        w-full
                                        h-[250px]
                                        
                                    '
                                />  
                                <div className='px-2 py-2'>
                                    <div className='font-bold text-xl'>{item.title}</div>
                                    <div className='text-sm font-light'>{item.subtitle}</div>
                                    <div className='flex justify-end items-center'>
                                        <div 
                                            className='text-blue-700 italic underline text-[0.8rem] cursor-pointer'
                                            onClick={()=>router.push(`/contact/${item.id}`)}
                                        >
                                            Đến bài viết
                                        </div>
                                    </div>
                                </div>
                            </div>
                })}
                </Carousel>
            </div>
           <div className="font-bold text-2xl py-4">Bài viết hàng đầu </div>
           <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                gap-6
            "
           >
                {article.map((item)=>{
                    return (
                        <div key={item.title} >
                            <div className="font-bold text-sm">{item.title}</div>
                            <div className="font-light text-sm">{item.content}</div>
                            
                        </div>
                    )
                })}
           </div>
        </div>
    )
}

export default ContactMenuMain
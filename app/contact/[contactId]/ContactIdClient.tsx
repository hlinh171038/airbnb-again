"use client"
"use client"
import Container from '@/app/components/Container'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import {caroselArr} from '@/app/components/contact/ContactMenuMain'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { BsDot } from 'react-icons/bs'

const cata = [
    {
        title:"Nơi bạn tới trong như thế nào ?",
        content:"Tìm tất cả thông tin chi tiết về các loại lưu trú khác nhau bao gồm toàn bộ địa điểm, phòng riêng, phòng khách sạn và phòng chung."
    },
    {
        title:"Nhắn tin cho chủ nhà ",
        content:"Đọc thêm về thời điểm bạn cần nhắn tin cho Chủ nhà hoặc thời điểm đó có thể là một ý kiến ​​hay."
    },
    {
        title:"Yêu cầu đến thăm trước khi đặt phòng",
        content:"Làm thế nào để tìm thêm thông tin chi tiết về một địa điểm mà không cần phải truy cập."
    },
    {
        title:"Lời mời và ưu đãi đặc biệt",
        content:"Chi tiết về cách hoạt động của phê duyệt trước và ưu đãi đặc biệt."
    },
    {
        title:"Tìm kiếm các địa điểm có tính năng trợ năng",
        content:"Làm thế nào để tìm một nơi để ở đáp ứng nhu cầu di chuyển của bạn."
    },
    {
        title:"Sử dụng bộ lọc tìm kiếm",
        content:"Thêm chi tiết về tất cả các bộ lọc có sẵn."
    },
    {
        title:"Chính sách tiệc tùng và sự kiện",
        content:"Chúng tôi đã tạo Chính sách về Tiệc và Sự kiện để cung cấp hướng dẫn rõ ràng về những gì chúng tôi mong đợi từ mọi người."
    }
]

const ContactIdClient =() =>{
    const params = useParams();
    const router = useRouter();

    const contactId = useMemo(()=>{
       let result =  caroselArr.find((item)=> item.id === params.contactId);
        return result;
        },[params])
    return (
        
       <div >
        <div className="w-full h-auto relative">
                    <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
                        <Header
                            title="Bài viết"
                            subtitle="Bài viết Airbnb"
                            big
                            center
                            white
                        />
                    </div>
                    <Image
                        src="/title-03.webp"
                        width={1000}
                        height={1000}
                        alt="trips"
                        objectPosition="top"
                        className="w-full h-[300px] object-cover "
                    />
            </div>
            <div className="flex text-sm font-light px-4 py-4 ">
                <div className='cursor-pointer font-bold hover:text-neutral-500' onClick={()=>router.push('/contact')}>Trang chủ /</div>
                <div>Tìm chỗ ở phù hợp với bạn</div>
            </div>
         <Container>
            <div
                className='
                    mt-2
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                '
            > 
                <div className='col-span-2 px-4'>
                    <div className='font-bold text-2xl capitalize'>{contactId?.title}</div>
                    <div className='flex items-center text-sm '>
                        <div>Hướng dẫn</div>
                        <BsDot />
                        <div>{contactId?.category}</div>
                    </div>
                    <div>
                        <Image
                            src={contactId?.img as string}
                            width={400}
                            height={400}
                            alt="Contact Id"
                            className='
                                w-full
                                
                                py-4
                                h-[400px]
                                max-h-[400px]
                                object-cover
                            '
                        />

                    </div>
                    <div className='font-light text-justify'>Muốn giúp tìm một nơi tuyệt vời để ở? Dưới đây là những lĩnh vực hàng đầu mà khách có thắc mắc khi tìm kiếm chuyến đi tiếp theo.</div>
                    <div className ="font-light py-4 text-justify">{contactId?.content}</div>
                    <hr/>
                    <div>
                        {cata.map((item)=>{
                            return (
                                <div className='border-b-[1px] py-4 ' key={item.title}>
                                    <div className='font-bold '>
                                        {item.title}
                                    </div>
                                    <div className='font-light text-justify'>
                                        {item.content}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='px-4'>
                   <div>
                        <div className='font-bold text-2xl '>Bài viết liên quan</div>
                        <div>
                            {caroselArr.map((item)=>{
                                return (
                                    <div key={item.title} className='text-sm font-light underline italic cursor-pointer hover:text-neutral-600'>
                                        {item.title}
                                    </div>
                                )
                            })}
                        </div>
                   </div>
                </div>
                
            </div>
        </Container>
            <Footer />
       </div>
    )
}

export default ContactIdClient
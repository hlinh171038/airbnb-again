"use client"

import { BsFillTelephoneForwardFill } from "react-icons/bs"
import Button from "../Button"
import { MdPlace } from "react-icons/md"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { caroselArr } from "./ContactMenuMain";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ContactGuest =()=>{
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
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <div>
            {/* keep in touch */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-8">
                <div className="col-span-2 bg-neutral-100 px-4 py-4">
                    {/* form */}
                    <div className="font-light text-[0.8rem] py-4">Bạn gặp một số vấn đề, rắc rối trong quá trình đặt phòng, thanh toán, hủy chuyến,...muốn liên hệ với chúng tôi.</div>
                    <div className="font-bold text-sm py-4 capitalize">Kết nối đặt biệt với chúng tôi</div>
                    <form className="flex flex-col gap-4">
                        <div className="block xl:flex gap-4">
                           <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="fname" className="text-[0.8rem]  text-neutral-600 font-light">Họ</label>
                            <input type="text" id="fname" name="fname" className="border-[1px] rounded-md focus:border-blue-400 cursor-pointer" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="lname"  className="text-[0.8rem]  text-neutral-600 font-light">Tên</label>
                            <input type="text" id="lname" name="lname" className="border-[1px] rounded-md focus:border-blue-400 cursor-pointer" />
                           </div>
                        </div>
                        <div className="block xl:flex gap-4">
                           <div  className="flex flex-col gap-1 w-full">
                            <label htmlFor="email"  className="text-[0.8rem]  text-neutral-600 font-light" >Email</label>
                            <input type="text" id="email" name="email" className="border-[1px] rounded-md focus:border-blue-400 cursor-pointer" />
                           </div>
                           <div  className="flex flex-col gap-1 w-full">
                            <label htmlFor="phone"  className="text-[0.8rem]  text-neutral-600 capitalize font-light">Số điện thoại</label>
                            <input type="text" id="phone" name="phone" className="border-[1px] rounded-md focus:border-blue-400 cursor-pointer" />
                           </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="company" className="text-neutral-600 capitalize text-[0.8rem]  font-light">Tên công ty</label>
                            <input type="text" name="company" id="company" className="border-[1px] rounded-md focus:border-blue-400 cursor-pointer"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="company" className="text-neutral-600 capitalize text-[0.8rem]  font-light">Tên công ty</label>
                            <input type="text" name="company" id="company" className="border-[1px] rounded-md focus:border-blue-400 cursor-pointer"/>
                        </div>
                        <div className="block xl:flex gap-4">
                           <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="code" className="text-[0.8rem]  text-neutral-600 font-light">Mã Postal</label>
                            <input type="text" id="code" name="code" className="border-[1px] rounded-md focus:border-blue-400 cursor-pointer" />
                           </div>
                           <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="conutry"  className="text-[0.8rem]  text-neutral-600 font-light">Quốc Gia</label>
                            <input type="text" id="conutry" name="conutry" className="border-[1px] rounded-md focus:border-blue-400 cursor-pointer" />
                           </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="message" className="text-neutral-600 capitalize text-[0.8rem]  font-light">Dòng tin</label>
                            <textarea name="message" 
                                      id="message" 
                                      cols={50} 
                                      rows={4} 
                                      placeholder="Gửi thắc mắc của bạn tại đây..." 
                                     className="border-[1px] rounded-md px-2 py-4 text-sm font-light"
                            >

                            </textarea>
                        </div>
                        <div className="flex justify-end px-4 py-4 items-center">
                            <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:opacity-2 animate-pulse font-light text-[0.8rem] ">Kết nối</button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-4 my-4 md:my-0 px-2">
                    <div className=" font-bold text-sm ">Nhóm Airbnb hổ trợ nhanh.</div>
                    <div className="text-[0.8rem]  font-light text-neutral-500">Đường dây nóng hoạt động 24/7, hổ trợ nhanh tất cả các vấn đề bạn gặp phải khi trải nghiệm với Airbnb. Dường đây nóng có thể gặp sự cố hoặc quá tải trong giờ cao điểm khách hàng liên hệ lại sau.</div>
                    <hr />
                    <div className="flex gap-4">
                        <div className="">
                            <BsFillTelephoneForwardFill  className="text-green-500" size={25}/>
                        </div>
                        <div className="flex flex-col gap-2 text-sm font-light">
                            <div>
                                <div className="font-bold text-sm after:">Đường dây hổ trợ miễn phí</div>
                                <div className="text-neutral-500 text-sm">19006886</div>
                            </div>
                            <div>
                                <div className="font-bold after: text-sm">Đường dây khu vực</div>
                                <div className="text-neutral-500 text-[0.8rem] ">090875 xxxx</div>
                            </div>
                            <div>
                                <div className="font-bold after: text-sm">Đường dây Fax</div>
                                <div className="text-neutral-500 text-[0.8rem] ">090875 xxxx</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div><MdPlace size={30} className="text-red-500 "/></div>
                        <div className="text-[0.8rem]  font-light">7/23 ấp 2, Nhơn Đức, Nhà Bè, Hồ Chí Minh, Việt Nam.</div>
                    </div>
                </div>
            </div>
             {/* carosel */}
             <div className='my-4'>
                <Carousel responsive={responsive} >
                {caroselArr.map((item)=>{
                    return <div className='px-2 shadow-md' key={item?.title.substring(0,10)}>
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
                                    <div className='font-bold '>{item.title}</div>
                                    <div className='text-[0.8rem] font-light'>{item.content.substring(0,90)}...</div>
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
        </div>
    )
}

export default ContactGuest
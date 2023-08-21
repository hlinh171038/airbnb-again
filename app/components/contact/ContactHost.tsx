"use client"

import { useRouter } from "next/navigation"
import { BsDot } from "react-icons/bs"
import { FcSearch } from "react-icons/fc"
import { LiaHandPointerSolid } from "react-icons/lia"
import {SiAirbnb} from 'react-icons/si'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { caroselArr } from "./ContactMenuMain"
import Image from "next/image"


const ContactHost =() =>{
    const router = useRouter();
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-8">
                <div className="w-full flex flex-col gap-4 py-4 md:py-0">
                    <div className="text-rose-500 text-4xl text-center ">
                        Airbnb.
                    </div>
                    <div className="text-lg md:text-3xl text-center">
                        Bạn có thể kiếm được
                    </div>
                    <div className="text-semibold text-2xl md:text-4xl text-center">
                        500.000 đ/ đêm
                    </div>
                    <div className="underline text-sm text-neutral-500 text-center cursor-pointer">Tìm hiểu cách chúng tôi ước tính thu nhập của bạn.</div>
                    <div className=" border-[1px] rounded-full px-4 py-2 flex gap-6 items-center cursor-pointer">
                        <div><FcSearch size={30}/></div>
                        <div >
                            <div className="text-sm font-bold">Thành phố Hồ Chí Minh</div>
                            <div className="flex items-ceter text-sm ">Toàn bộ nhà <BsDot className="flex items-center"/> 2 phòng ngủ</div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[450px]">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.724840195037!2d106.69723175997817!3d10.678453060950567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317530403c4e3c23%3A0x9e8eec6b7047566e!2z4bqkcCAyLCBOaMahbiDEkOG7qWMsIE5ow6AgQsOoLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1692588361696!5m2!1svi!2s" className="w-full h-full"   loading="lazy" ></iframe>
                </div>
                
            </div>
            <div>
                    <div className="w-full">
                        <div className="grid grid-cols-2  items-center gap-4 text-sm font-light w-full"> 
                                <div className="flex gap-2">
                                    <LiaHandPointerSolid/> 
                                    <div className="flex justify-start">Dễ dàng cho thuê nhà với </div>
                                </div>
                                <div className="w-full flex justify-start  sm:w-auto sm:col-span-1">
                                <span 
                                    onClick={()=>router.push('/rent')}
                                    className=" cursor-pointer flex items-center gap-4 bg-rose-500 hover:bg-rose-400 text-white px-2 py-2 rounded-lg animate-pulse">
                                    <div className="hidden sm:block">
                                        <SiAirbnb/>
                                    </div>
                                    <div>
                                        Airbnb Setup
                                    </div>
                                </span>
                                </div>
                        </div>
                        <div className="grid grid-cols-2  items-center gap-4 text-sm font-light w-full"> 
                                <div className="flex gap-2">
                                    <LiaHandPointerSolid/> 
                                    <div className="flex justify-start">Hướng dẫn riêng từ một chủ nhà siêu câp </div>
                                </div>
                                <div className="w-full flex w-auto sm:col-span-1 px-4">
                                    <span className="underline cursor-pointer">kết nối ngay.</span>
                                </div>
                        </div>
                        <div className="grid grid-cols-2  items-center gap-4 text-sm font-light w-full"> 
                                <div className="flex gap-2">
                                    <LiaHandPointerSolid/> 
                                    <div className="flex justify-start">Hổ trợ đặt biệt từ </div>
                                </div>
                                <div className="w-full flex justify-start sm:w-auto sm:col-span-1">
                                    <span className="underline cursor-pointer">Airbnb.</span>
                                </div>
                        </div>
                        
                    </div>
            </div>
            {/* carosel */}
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
                                    <div className='font-bold text-xl'>{item.title}</div>
                                    <div className='text-sm font-light'>{item.content.substring(0,90)}...</div>
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

export default ContactHost
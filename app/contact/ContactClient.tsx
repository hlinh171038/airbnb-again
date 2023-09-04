"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Container from "../components/Container"
import ContectMenuItem from "../components/contact/ContectMenuItem"
import { SafeUser } from "../types"
import ContactContent from "../components/contact/ContactContent"
import ContactMenuMain from "../components/contact/ContactMenuMain"
import ContactItem from "../components/contact/ContactItem"
import Button from "../components/Button"
import Footer from "../components/Footer"
import ContactGuest from "../components/contact/ContactGuest"
import ContactHost from "../components/contact/ContactHost"
import ContactAdmin from "../components/contact/ContactAdmin"
import Header from "../components/Header"
import Image from "next/image"

interface ContactClientProps {
    currentUser: SafeUser | null
}

const menu = [
    {
        label:"Khách",
        description:"This property is close to the beach!"
    },
    {
        label:"Chủ nhà",
        description:"This property is close to the beach!"
    },
    {
        label:"Tổ chức",
        description:"This property is close to the beach!"
    },
    {
        label:"Admin",
        description:"This property is close to the beach!"
    }
]
const menu2 = [
    {
        title:"Chính sách cộng đồng của chúng tôi",
        description:"Cách chúng tôi xây dựng một nền tảng của sự tin tưởng.",
        img:"/contact-01.webp"
    },
    {
        title:"Mẹo và hướng dẫn về an toàn",
        description:"Tài nguyên giúp đảm bảo an toàn cho du khách, chủ nhà.",
        img:"/contact-02.webp"
    }
]
const ContactClient:React.FC<ContactClientProps>= ({
    currentUser
})=>{
    const params = useSearchParams();
    const path = usePathname();
    let category = params?.get('category')

    if(path ==='/contact/')
    {
        return null;
    }


    
    let bodyContent =(
        <ContactMenuMain />
    )

    if(category === 'Khách')
    {
        bodyContent =(
            <ContactGuest />
        )
    }
    if(category === 'Chủ nhà')
    {
        bodyContent =(
            <ContactHost />
        )
    }
    if(category ==="Admin")
    {
        bodyContent =(
            <ContactAdmin />
        )
    }
    return (
        <div>
             <div className="w-full h-auto relative">
                <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
                    <Header
                        title="Trung tâm trợ giúp"
                        subtitle="Liên hệ chúng tôi bất cứ khi nào bạn cần"
                        big
                        center
                        white
                    />
                </div>
                <Image
                    src="/title-02.webp"
                    width={1000}
                    height={1000}
                    alt="trips"
                    objectPosition="top"
                    className="w-full h-[300px] object-cover "
                />
            </div>
            <Container>
                <div className="px-0 lg:px-20 py-8">
                    {/* menu */}
                    <div className="flex gap-4 border-b-[1px] py-2 text-sm font-bold cursor-pointer px-2">
                        {menu.map((item)=>{
                            return <ContectMenuItem
                                        key={item.label}
                                        label={item.label}
                                        description={item.description}
                                        selected = {category === item.label}
                                    />
                        })}
                    </div>
                    {/* content */}
                        <ContactContent 
                            body={bodyContent}
                        />
                </div>
            </Container>
            {/* liên hệ */}
            <div 
                className="
                        bg-neutral-900
                        px-4
                        lg:px-28
                        py-8
                "
            >
                <div className="font-bold text-white py-4 text-lg">Khám phá thêm</div>
                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        gap-4
                       
                "
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-2">
                        {menu2.map((item)=>{
                            return (
                                <ContactItem
                                    title={item.title}
                                    description={item.description}
                                    img ={item.img}
                                />
                            )
                        })}
                    </div>
                    <div className="flex flex-col gap-4 col-span-1 sm:col-span-2 md:col-span-1">
                        <div className="font-bold text-lg text-white">Bạn cần liên lạc ?</div>
                        <div className="text-white text-[0.8rem] font-light">Để bắt đầu, vui lòng trả lời một số câu hỏi để chúng tôi có thể kết nối bạn với bộ phận phù hợp.</div>
                        <div >
                            <Button 
                                label="Liên lạc với chúng tôi"
                                onClick={()=>{}}
                            />
                        </div>
                        <div className="text-white text-[0.8rem]">Bạn cũng có thể <span className="underline cursor-pointer">gửi phản hồi cho chúng tôi</span></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactClient
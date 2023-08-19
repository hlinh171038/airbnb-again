"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Container from "../components/Container"
import ContectMenuItem from "../components/contact/ContectMenuItem"
import { SafeUser } from "../types"
import ContactContent from "../components/contact/ContactContent"
import ContactMenuMain from "../components/contact/ContactMenuMain"

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
        label:"Người tổ chức trải nghiệm",
        description:"This property is close to the beach!"
    },
    {
        label:"Quản trị viên",
        description:"This property is close to the beach!"
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
            <div>
                Khách
            </div>
        )
    }
    if(category === 'Chủ nhà')
    {
        bodyContent =(
            <div>
                Chủ nhà
            </div>
        )
    }
    return (
        <Container>
            <div>
                {/* header */}
                <div className="font-bold text-4xl text-center">Chào {currentUser?.name}, Tôi có thể giúp gì cho bạn?</div>
            </div>
            <div className="px-20 py-8">
                {/* menu */}
                <div className="flex gap-4 border-b-[1px] py-2 text-sm font-bold cursor-pointer">
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
    )
}

export default ContactClient
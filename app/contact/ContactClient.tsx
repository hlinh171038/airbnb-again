"use client"

import Container from "../components/Container"
import ContectMenuItem from "../components/contact/ContectMenuItem"
import { SafeUser } from "../types"

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
                                    label={item.label}
                                    description={item.description}
                                />
                    })}
                </div>
                {/* content */}

            </div>
        </Container>
    )
}

export default ContactClient
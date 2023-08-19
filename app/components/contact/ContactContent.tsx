"use client"

interface ContactContentProps {
    body:React.ReactElement
}
const ContactContent:React.FC<ContactContentProps> = ({
    body
})=>{
    return (
        <div>
            {body}
        </div>
    )
}

export default ContactContent
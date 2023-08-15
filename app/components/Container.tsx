"use client"

interface ContainerProps {
    children: React.ReactNode;
}
const Container:React.FC<ContainerProps> = ({
    children
}) =>{
    return (
        <div
            className="
                xl:px-20
                md:px-10
                sm:px-4
                px-2
            "
        >
            {children}
        </div>
    )
}

export default Container
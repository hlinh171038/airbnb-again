"use client"


interface TagProps {
    tag1:string
}
const Tag:React.FC<TagProps> = ({
    tag1
}) =>{
    return (
        <div>
            {/* home tag */}
            <div className="relative bg-rose-500 w-[150px] h-[30px] overflow-y-clip">
                <div className="absolute top-[-9px] left-[22px] bg-neutral-300 w-[50px] h-[50px] rotate-45 z-10"></div>
                <div className="w-[50px] h-[50px] bg-neutral-300 absolute top-0 left-0"></div>
                <div className="absolute top-0 left-2 z-10 ">Home</div>
                <div className="absolute bg-rose-500 rotate-45 top-[-9px] right-[-5px] w-[50px] h-[50px]"></div>
                <div className="absolute top-0 right-4 ">Trips </div>
            </div>
        </div>
    )
}

export default Tag
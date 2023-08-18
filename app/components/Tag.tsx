"use client"


interface TagProps {
    tag1:string;
    tag2?: string
}
const Tag:React.FC<TagProps> = ({
    tag1,
    tag2
}) =>{
    return (
        <div>
            {/* home tag */}
            <div 
                className={`
                    relative 
                   
                    h-[30px]
                    overflow-y-clip
                    ${tag2 ? " w-[280px] ":" w-[170px] "}
                    ${tag2 ? "  bg-rose-400 ":"  bg-rose-500 "}
                `}
            >
                <div className="absolute top-[-9px] left-[22px] bg-neutral-300 w-[50px] h-[50px] rotate-45 z-10"></div>
                <div className="w-[50px] h-[50px] bg-neutral-300 absolute top-0 left-0 z-10"></div>
                <div className="absolute top-[1px] left-4 z-10 ">Nhà</div>
                <div className={`absolute  rotate-45 top-[-9px] right-[-5px] w-[50px] h-[50px] ${tag2 ?"bg-rose-400":"bg-rose-500"}`}  ></div>
                <div className={`absolute top-[1px] ${!tag2 ?"right-2":"right-4"}`}>{tag2 ?"Chi tiết":"Chuyến"} </div>
                {tag2 && (
                    <div className="absolute top-0 left-0 w-[200px] h-[30px]">
                        <div className="relative  bg-rose-500 w-[170px] h-[30px] overflow-visible z-0">
                            <div className="absolute bg-rose-500 rotate-45 top-[-8px] right-[-7px] w-[50px] h-[50px]"></div>
                            <div className="absolute top-0 left-20">Chuyến </div>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tag
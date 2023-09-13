"use client"


interface HeaderProps {
    title: string;
    subtitle:string;
    center?:boolean;
    big?: boolean;
    rent?: boolean;
    white?:boolean;
}
const Header:React.FC<HeaderProps> =({
    title,
    subtitle,
    center,
    big,
    rent,
    white
}) =>{
    return (
        <div className={`px-4 ${rent ?"mt-6":"pt-2"} ${center ? 'text-center':'text-start'}`}>
        <h1 className={`${big ?'font-bold uppercase text-xl md:text-2xl':'font-bold uppercase'} 
                            mt-4
                        ${white && 'text-white'}
                        `}>
            {title}
        </h1>
        <p className="text-neutral-400 text-semibold text-sm ">{subtitle}</p>
    </div>
    )
}

export default Header
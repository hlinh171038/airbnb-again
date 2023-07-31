"use client"


interface HeaderProps {
    title: string;
    subtitle:string;
    center?:boolean;
    big?: boolean;
    rent?: boolean;
   
}
const Header:React.FC<HeaderProps> =({
    title,
    subtitle,
    center,
    big,
    rent,

}) =>{
    return (
        <div className={` ${rent ?"mt-6":"pt-2"} ${center ? 'text-center':'text-start'}`}>
        <h1 className={`${big ?'font-bold uppercase text-xl md:text-2xl':'font-bold uppercase'} 
                            mt-4
                        `}>
            {title}
        </h1>
        <p className="text-neutral-400 text-semibold text-sm text-muted">{subtitle}</p>
    </div>
    )
}

export default Header
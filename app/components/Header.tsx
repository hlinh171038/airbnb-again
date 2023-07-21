"use client"


interface HeaderProps {
    title: string;
    subtitle:string;
    center?:boolean;
    big?: boolean
}
const Header:React.FC<HeaderProps> =({
    title,
    subtitle,
    center,
    big
}) =>{
    return (
        <div className={`pt-2 ${center ? 'text-center':'text-start'}`}>
        <h1 className={`${big ?'text-bold uppercase text-2xl':'text-bold uppercase'}`}>
            {title}
        </h1>
        <p className="text-neutral-400 text-semibold text-sm text-muted">{subtitle}</p>
    </div>
    )
}

export default Header
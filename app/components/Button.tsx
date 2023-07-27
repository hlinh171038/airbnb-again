"use client"

import { IconType } from "react-icons/lib";


interface ButtonProps {
    label: string;
    disabled?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) =>void;
    outline?: boolean;
    icon?:IconType
}
const Button:React.FC<ButtonProps> =({
    label,
    disabled,
    onClick,
    outline,
    icon:Icon
}) =>{
    return (
        <button
          onClick={onClick}
          className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          px-2 
          py-1
         w-full
          ${outline ? 'bg-white': 'bg-rose-600'}
          ${outline ? 'border-2 border-neutral-200 hover:border-neutral-400': 'border-none'}
          ${outline ? 'text-black': 'text-white'}
          
          `}
        >
            {Icon && (
                <Icon 
                 size={24}
                 className="
                  absolute
                  left-4
                  top-1
                 "
                />
            )}
            {label}
        </button>
    )
}

export default Button
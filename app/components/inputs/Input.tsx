"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { TbCurrencyDong } from "react-icons/tb";


interface InputProps{
    label: string;
    type?: string;
    id:string;
    register:UseFormRegister<FieldValues>;
    required?: boolean;
    errors: FieldErrors;
    disabled?: boolean;
    formatPrice?: boolean;
    description?:boolean;
}
const Input:React.FC<InputProps> =({
    id,
    label,
    type,
    register,
    required,
    errors,
    disabled,
    formatPrice,
    description
}) =>{
    return (
        <div
            className="
                w-full
                relative
                py-2
            "
        >

            {
                formatPrice && (
                    <TbCurrencyDong 
                        className="
                            absolute
                            text-neutral-700
                            top-5
                            left-2
                            z-10
                        "
                    />
                )
            }
            <input 
                id={id}
                type={type}
                {...register(id,{required})}
                disabled={disabled}
                placeholder={label}
                className={`
                    peer
                    relative
                    w-full
                    rounded-lg
                    bg-white
                    font-light
                    border-2
                    focus:outline-none focus:border-rose-100
                    text-sm
                    p-3
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-rose-500':'border-black-700'}
                    ${errors[id] ? 'focus:border-rose-500':'focus:border-black-700'}
                    ${errors[id] ? 'text-rose-500':'text-zinc-600'}
                    ${description && "h-[200px]"}
                `}
            />
        </div>
    )
}

export default Input
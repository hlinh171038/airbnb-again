"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


interface InputProps{
    label: string;
    type?: string;
    id:string;
    register:UseFormRegister<FieldValues>;
    required?: boolean;
    errors: FieldErrors;
    disabled?: boolean
}
const Input:React.FC<InputProps> =({
    id,
    label,
    type,
    register,
    required,
    errors,
    disabled
}) =>{
    return (
        <div
            className="
                w-full
                relative
                py-2
            "
        >
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
                    ${errors[id] ? 'border-rose-500':'border-black-700'}
                    ${errors[id] ? 'focus:border-rose-500':'focus:border-black-700'}
                    ${errors[id] ? 'text-rose-500':'text-zinc-600'}
                `}
            />
        </div>
    )
}

export default Input
"use client"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modals from "./Modals"
import { useCallback } from "react"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import {useState} from 'react'
import axios from "axios"
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"
import Header from "../Header"
import Input from "../inputs/Input"
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub} from 'react-icons/ai'
import Button from "../Button"
import useLoginModal from "@/app/hooks/useLoginModal"

const RegisterModal =() =>{
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
      })

      const toggle = useCallback(()=>{
        loginModal.onOpen();
        registerModal.onClose();
      },[loginModal,registerModal]);


    //handle submit
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
        .then(()=>{
            toast.success("Loggined");
            router.refresh();
            registerModal.onClose()
        })
        .catch(()=>{
            toast.error("Something went wrong");
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }
   
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Header
                title="Register"
                subtitle="Register your account !!!"
                center
                big
            />
            <Input
                id="email"
                label="Email"
                type="text"
                register={register}
                disabled={isLoading}
                required
                errors={errors}
            />
             <Input
                id="name"
                label="Name"
                type="text"
                register={register}
                disabled={isLoading}
                required
                errors={errors}
            />
             <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                disabled={isLoading}
                required
                errors={errors}
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 ">
            <Button 
                label="Google"
                onClick={()=> {}}
                icon={FcGoogle}
                outline
            />
            <Button 
                label="Github"
                onClick={()=> {}}
                icon={AiFillGithub}
                outline
            />
            <div className='text-sm flex flex-row justify-center items-center text-neutral-500 gap-3'>
                <div>
                    Already have an account ?
                </div>
                <div
                    onClick={toggle}
                    className='text-neutral-800 cursor-pointer hover:underline'
                >
                    Login
                </div>
            </div>
        </div>
    )
    return (
        <Modals 
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Register"
            actionLabel="Register"
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal
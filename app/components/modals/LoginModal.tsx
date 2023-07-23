"use client"

import useLoginModal from "@/app/hooks/useLoginModal"
import Modals from "./Modals"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useState } from "react"
import {signIn} from "next-auth/react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Input from "../inputs/Input"
import Header from "../Header"
import Button from "../Button"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"


const LoginModal =() =>{
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    const loginModal = useLoginModal()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues:{
          email: '',
          password: ''
        }
      })


      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // signIn method form authorize from nextauth
        signIn('credentials',{
          ...data,
          redirect:false
        })
        .then((callback) =>{
          setIsLoading(false);

          if(callback?.ok)
          {
            // amount for users
            toast.success("Loggined!");
            // refesh
            router.refresh()
            // close modal
            loginModal.onClose()
          }

          if(callback?.error)
          {
            toast.error("Something went wrong !")
          }
      })
    }

    const bodyContent = (
      <div className="flex flex-col gap-4">
        <Header 
          title="Login"
          subtitle="Login your airbnb"
          big
          center
        />
        <Input
          id="email"
          label="Email"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
          type="email"
        />
         <Input
          id="password"
          label="Password"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
          type="password"
        />
      </div>
    )

    const footerContent = (
      <div className="flex flex-col gap-4">
        <Button 
          label="Google"
          onClick={()=>{}}
          disabled
          icon={FcGoogle}
          outline
        />
        <Button 
          label="Github"
          onClick={()=>{}}
          disabled
          icon={AiFillGithub}
          outline
        />
      </div>
    )
   
    return (
       <Modals
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        title="Login"
        actionLabel="Login"
        body={bodyContent}
        footer={footerContent}
       />
    )
}

export default LoginModal
"use client"

import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {IoMdClose} from 'react-icons/io'
import Button from "../Button";
import Logo from "../navbars/Logo";

interface ModalsProps {
    isOpen: boolean;
    onClose: () =>void;
    onSubmit: () =>void;
    title: string;
    body?:React.ReactElement;
    footer?:React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () =>void;
    secondaryActionLabel?:string;
    rent?:boolean;
    step?:boolean;
    lastStep?: boolean;
    firstStep?: boolean;
    tripId?: boolean;
}
const Modals:React.FC<ModalsProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    rent,
    lastStep,
    firstStep,
    tripId
}) =>{

    const [showModal,setShowModal] = useState(isOpen)

    // handle close modals
    const handleCloseModal = useCallback(()=>{

        if(disabled){
            return;
        }

        setShowModal(false);
        setTimeout(()=>{
            onClose()
        },300)
    },[disabled,onClose]);

    // handle submit
    const handleSubmit = useCallback(()=>{
   
        if(disabled) {
            return ;
        }
        onSubmit()
    },[disabled,onSubmit])

    
    // handle secondary actions

    const handleSecondaryAction = useCallback(()=>{
      if(disabled || !secondaryAction)
      {
        return;
      }

      secondaryAction()
      },[disabled, secondaryAction])


    useEffect(()=>{
      setShowModal(isOpen)
      
    },[isOpen])

    if(!isOpen)
    {
        return null;
    }
    return (
        <div
         className="
          bg-neutral-800/70
          border-[1px]
          shadow-md
          flex
          justify-center
          items-center
          w-full
          h-[100vh]
          z-50
          fixed
         "
        >
         <div
          className={`
            ${!rent ?"w-full md:w-4/6 lg:w-3/6 xl:w-2/6 h-full md:h-auto lg:h-auto  my-6 mx-auto px-2 py-4" : " w-full  h-[100vh]"}
          `}
         >
            <div
             className={`
               translate
               duration-300
               ${rent && "w-full h-full"}
               ${showModal ? 'translate-y-0' : 'translate-y-full'}
               ${showModal ? 'opacity-100': 'opacity-0'}
             `}
            >
              <div
               className={`
                
                py-4
                border-0
                bg-white
                ${!rent && "rounded-lg"}
                ${rent ?"h-full relative":"h-full md:h-auto lg:h-auto px-3"}
               `}
              >
                {/* Header */}
                <div
                 className="
                  flex
                  flex-row
                  justify-between
                  items-center
                  px-2
                  py-1
                 "
                >
                   <div>
                    <Logo />
                   </div>
                  <button
                   onClick={handleCloseModal}
                   className="hover:text-neutral-400 transition"
                  >
                    <IoMdClose size={18}/>
                  </button>
                </div>
                <hr />
                {/* body */}
                <div>
                   {body}
                </div>
               {!rent && <hr/>}
                {rent ? (
                  <div
                  className={`
                     absolute 
                      bottom-4
                      px-20
                     w-full
                     ${firstStep ?"flex justify-end":"flex justify-between gap-8"}
                  `}
                >
                    {secondaryAction && secondaryActionLabel  && (
                    <button
                      onClick={handleSecondaryAction}
                      className="cursor-pointer underline font-bold hover:text-neutral-600"
                    >
                     
                      {secondaryActionLabel}
                    </button>
                    
                      // <Button 
                      //   disabled={disabled}
                      //   outline
                      //   label={secondaryActionLabel}
                      //   onClick={handleSecondaryAction}
                      // />
                    
                  ) }
                    <button
                    onClick={handleSubmit}
                      className={`
                      px-6
                      py-2
                      text-white
                      rounded-md
                      transition
                      ${lastStep ?" bg-rose-600 hover:bg-rose-700":"bg-neutral-300 hover:bg-neutral-400"}
                      `}
                    >
                       {actionLabel}
                    </button>
                  
                </div>
                ):(
                  
                  <div
                  className={`
                    flex
                    flex-row
                    justify-between
                    items-center
                    my-4
                    mb-6
                    py-2
                    
                  `}
                >
                    <Button
                     disabled={disabled}
                     onClick={handleSubmit} 
                     label={actionLabel}
                   />
                  {secondaryAction && secondaryActionLabel  && (
                    <Button 
                      disabled={disabled}
                      outline
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  ) }
                </div>
                )}
               
                
                   {footer}
              </div>
            </div>
         </div>
        </div>
    )
}

export default Modals
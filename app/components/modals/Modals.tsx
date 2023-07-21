"use client"

import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {IoMdClose} from 'react-icons/io'
import Button from "../Button";

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
    secondaryActionLabel
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
          className="
         
           w-full
           md:w-4/6
           lg:w-3/6
           xl:w-2/6
           my-6
           mx-auto
           px-2 
           py-4
           h-full
           md:h-auto
           lg:h-auto
           
          "
         >
            <div
             className={`
               translate
               duration-300
               ${showModal ? 'translate-y-0' : 'translate-y-full'}
               ${showModal ? 'opacity-100': 'opacity-0'}
             `}
            >
              <div
               className="
                
                h-full
                lg:h-auto
                md:h-auto
                border-0
                bg-white
               "
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
                   <div> {title}</div>
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
                <hr />
                <div
                  className="
                    flex
                    flex-row
                    justify-between
                    items-center
                    px-2 
                    py-2
                  "
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
              </div>
            </div>
         </div>
        </div>
    )
}

export default Modals
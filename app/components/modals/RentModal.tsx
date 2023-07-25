"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Modals from "./Modals"
import {useCallback,useState,useMemo} from 'react'


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}
const RentModal = () =>{
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const onBack = () =>{
        setStep((value)=> value - 1);
    }
    const onNext = () =>{
        setStep((value)=> value + 1);
    }


    const handleActionLabel = useMemo(()=>{
        //last steps --> return create
        if(step === STEPS.PRICE)
        {
            return 'Create'
        }

        return 'Next'
    },[step]);

    const secondaryActionLabel = useMemo(()=>{
        // first steps --> return undefined
        if(step === STEPS.CATEGORY){
            return undefined;
        }

        return 'Back';
    },[])

    return (
        <Modals 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={()=>{}}
            title="Rent"
            actionLabel={handleActionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step ===STEPS.CATEGORY ? undefined : onBack}
        />
        
    )
}

export default RentModal
"use client"

import useRentModal from "@/app/hooks/useRentModal"
import Modals from "./Modals"
import {useCallback,useState,useMemo} from 'react'

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import Header from "../Header"
import { categories } from "../navbars/Categories"
import CategoryInput from "../inputs/CategoryInput"
import CountrySelect from "../inputs/CountrySelect"
// import Map from "../Map"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"


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
    const [isLoading,setIsLoading] = useState(false)

    //react-hook-form
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues:{
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
      })

      // the other way to take value without submit
      const category = watch('category'); // watch(pass exactly name of defaultValue)
      const location = watch('location');
      const guestCount = watch('guestCount');
      const roomCount = watch('roomCount');
      const bathroomCount = watch('bathroomCount');
      const imageSrc = watch('imageSrc');
    
      // create specical set value, because method setCustomValue (react-hook-form) by default not set value
      const setCustomValue = (id:string, value: any) =>{
        setValue(id,value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const Map = useMemo(()=>dynamic(()=>import('../Map'),{
        ssr:false
    }),[location]);
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
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Header 
                title="Pick a category"
                subtitle="chose your favorite place"
                center
            />
            {/* LIST OF CATEGORY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-5">
                {categories.map((item) =>{
                    return <CategoryInput
                                key={item.label}
                                
                                // onClick recive category(watch) --> then, setCustomerValue(id,value)
                                onClick={(value) =>setCustomValue('category',value)}
                                // selected to style css
                                selected ={category === item.label}
                                label={item.label}
                                icon ={item.icon}
                            />
                })}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION)
    {
        bodyContent =(
            <div className="flex flex-col gap-3">
                <Header 
                    title="country"
                    subtitle="pick up your country where you want to visit"
                    center
                />
                <CountrySelect 
                    value={location}
                    onChange={(value)=>setCustomValue('location',value)}
                />
                {/* Map recive coordination and not support by react */}
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent=(
            <div className="flex flex-col gap-4 px-3 py-5">
                <Header 
                    title ="Room Utility"
                    subtitle="Share some basic about your place"
                    center
                />
                <Counter
                    title="Number of guest"
                    subtitle="How to guest to do allow ?"
                    value={guestCount}
                    onChange={(value)=>setCustomValue("guestCount",value)}
                />
                <Counter
                    title="Number of room"
                    subtitle="How to room to do allow ?"
                    value={roomCount}
                    onChange={(value)=>setCustomValue("roomCount",value)}
                />
                <Counter
                    title="Number of bathroomCount"
                    subtitle="How to bathroom to do allow ?"
                    value={bathroomCount}
                    onChange={(value)=>setCustomValue("bathroomCount",value)}
                />
            </div>
        )
    }

    if(step ===STEPS.IMAGES)
    {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Header 
                    title="image upload"
                    subtitle="pick up your picture to upload"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value)=>setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }


    if(step === STEPS.DESCRIPTION)
    {
        bodyContent =(
            <div className="flex flex-col gap-4">
                <Header 
                    title="Description"
                    subtitle="fill out the form"
                />
                <Input 
                    id="title"
                    type="text"
                    label="Title"
                    register={register}
                    required
                    disabled={isLoading}
                    errors={errors}
                />
                 <Input 
                    id="description"
                    type="text"
                    label="Description"
                    register={register}
                    required
                    disabled={isLoading}
                    errors={errors}
                />
            </div>
        )
    }

    if(step === STEPS.PRICE)
    {
        bodyContent =(
            <div>
                <Header 
                    title="Price"
                    subtitle="set up your price"
                />
                <Input 
                    id="price"
                    label="Price"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    return (
        <Modals 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            title="Rent"
            actionLabel={handleActionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step ===STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
        
    )
}

export default RentModal
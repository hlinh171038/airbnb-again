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
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import RentContent from "../rents/RentContent"
import { FcDam, FcHome, FcSupport } from "react-icons/fc"
import Image from "next/image"


enum STEPS {
    START = 0,
    CATEGORY = 1,
    LOCATION = 2,
    INFO = 3,
    OVERVIEW = 4,
    IMAGES =5,
    DESCRIPTION = 6,
    PRICE = 7
}
const RentModal = () =>{
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.START);
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter()

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
            bed: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
      })

      //submit handler
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if(step !== STEPS.PRICE)
        {
            return onNext()
        }

        axios.post('/api/listings', data)
            .then(()=>{
                toast.success('Listing is created');
                router.refresh();
                setStep(STEPS.CATEGORY)
                rentModal.onClose()
            })
            .catch(()=>{
                toast.error("Something went wrong")
            }).finally(()=>{
                setIsLoading(false)
            })
      }

      // the other way to take value without submit
      const category = watch('category'); // watch(pass exactly name of defaultValue)
      const location = watch('location');
      const guestCount = watch('guestCount');
      const roomCount = watch('roomCount');
      const bed = watch('bed');
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

        if(step === STEPS.START)
        {
            return "Bắt đầu"
        }

        return 'Next'
    },[step]);



    const secondaryActionLabel = useMemo(()=>{
        // first steps --> return undefined
        if(step === STEPS.START){
            return undefined;
        }

        return 'Back';
    },[step]);

    let bodyContent = (
        <div className="md:grid grid-cols-2 gap-8">
           <div className="flex justify-center items-center">
                <span className=" mt-4 text-2xl md:text-4xl font-semibold text-center w-full md:w-2/3">Bắt đầu trên Airbnb thật dễ dàng</span>
           </div>
           <div className="px-4 py-8">
            <div className="mb-4">
                <RentContent 
                    title="1 Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi"
                    content="Chia sẻ một số thông tin cơ bản, như vị trí của nhà/phòng cho thuê và số lượng khách có thể ở tại đó."
                    bold
                    icon={FcHome}
                />
            </div>
            <div className="mb-4">
                <RentContent 
                    title="2 Làm cho nhà/phòng cho thuê trở nên nổi bật"
                    content="Thêm từ 5 ảnh trở lên cùng với tiêu đề và nội dung mô tả – chúng tôi sẽ giúp bạn thực hiện."
                    bold
                    icon={FcDam}
                />
            </div>
            <div className="mb-4">
                <RentContent 
                    title="3 Hoàn thiện và đăng mục cho thuê"
                    content="Lựa chọn xem bạn muốn bắt đầu với việc đón tiếp khách có kinh nghiệm, chọn giá khởi điểm hay đăng mục cho thuê."
                    bold
                    icon={FcSupport}
                />
            </div>
           </div>
        </div>
    )


    if(step ===STEPS.CATEGORY)
    {
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Header 
                    title="Điều nào sau đây mô tả chính xác nơi ở của bạn"
                    subtitle="Chọn một nơi mô tả phù hợp nhất"
                    center
                    big
                   
                />
                {/* LIST OF CATEGORY */}
                <div className="grid grid-cols-1 px-16 sm:grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-5">
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
    }

    if(step === STEPS.LOCATION)
    {
        bodyContent =(
            <div className="flex flex-col gap-3 px-4">
                <Header 
                    title="Quốc gia của bạn ở đâu ?"
                    subtitle="Chọn quốc gia của bạn..."
                    center
                    big
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
            <div className="flex px-8 py-5 flex justify-center">
                <div className="w-full sm:w-1/2 flex flex-col gap-8">
                    <Header 
                        title ="Chia sẻ thông tin cơ bản về chỗ ở của bạn"
                        subtitle="Sau này, bạn sẽ bổ sung những thông tin khác, như loại giường chẳng hạn.e"
                        center
                        big
                    />
                    <Counter
                        title="Number of guest"
                        subtitle="How to guest to do allow ?"
                        value={guestCount}
                        onChange={(value)=>setCustomValue("guestCount",value)}
                    />
                    <Counter
                        title="Số lượng giường ngủ:"
                        subtitle="Bao nhiêu giường mỗi phòng"
                        value={bed}
                        onChange={(value)=>setCustomValue("bed",value)}
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
            </div>
        )
    }

    if(step === STEPS.OVERVIEW)
    {
        bodyContent = (
            <div className="w-full h-full  flex justify-center items-center">
                <div className=" w-full px-4 sm:w-2/3 flex flex-col lg:flex-row justify-between items-center gap-4 pt-8">
                    <Header 
                        title="Làm cho chỗ ở của bạn trở nên nổi bật"
                        subtitle="Ở bước này, bạn sẽ thêm một số tiện nghi được cung cấp tại chỗ ở của bạn, cùng với 5 bức ảnh trở lên. Sau đó, bạn sẽ soạn tiêu đề và nội dung mô tả."
                        big
                    />
                    <Image 
                        src="/house-modal.jpg"
                        alt="House Modal"
                        width={500}
                        height={500}
                    />
                </div>
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
                   
                    errors={errors}
                />
                 <Input 
                    id="description"
                    type="text"
                    label="Description"
                    register={register}
                    required
                    
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
            onSubmit={handleSubmit(onSubmit)}
            title="Rent"
            actionLabel={handleActionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step ===STEPS.START ? undefined : onBack}
            body={bodyContent}
            rent
            lastStep={step ===STEPS.PRICE ?true:false}
            firstStep = {step === STEPS.START ? true: false}
        />
        
    )
}

export default RentModal
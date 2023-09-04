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
import { TbBeach, TbBeachOff, TbHorseToy, TbMountain, TbPool, TbSkateboard, TbViewportWide, TbWashMachine } from "react-icons/tb"
import { GiCampingTent, GiGasStove, GiHeatHaze, GiPeaceDove, GiPoolDive, GiSmokeBomb, GiWatchtower, GiWindmill } from "react-icons/gi"
import { MdFamilyRestroom, MdOutlineFamilyRestroom, MdOutlineHouseSiding, MdOutlineVilla, MdPlace, MdYard } from "react-icons/md"
import UtilitiesInput from "../inputs/UtilitiesInput"
import { FaBath, FaFireExtinguisher, FaShower, FaWifi } from "react-icons/fa"
import {PiPersonArmsSpreadFill, PiTelevisionSimpleFill} from 'react-icons/pi'
import {MdKitchen} from 'react-icons/md'
import {GiWashingMachine} from 'react-icons/gi'
import {AiFillCar} from 'react-icons/ai'
import {TbAirConditioning} from 'react-icons/tb'
import {MdTableRestaurant} from 'react-icons/md'
import {LiaUmbrellaBeachSolid} from 'react-icons/lia'
import {LuCalculator} from 'react-icons/lu'
import { BiSolidPiano } from "react-icons/bi"
import {CgGym} from 'react-icons/cg'
import { ImAidKit } from "react-icons/im"
import { BsDoorOpen, BsHouseDoor } from "react-icons/bs"
import {MdGroup} from 'react-icons/md'
import { TiGroup } from "react-icons/ti"

 export const utilitiesArr =[
    {
        label: 'Wifi',
        icon: FaWifi,
        description: 'This property is close to the beach!',
        selected:false,
      },
      {
        label: 'Tivi',
        icon: PiTelevisionSimpleFill,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Bếp',
        icon: MdKitchen,
        description: 'This property is modern!',
        selected:false,
      },
      {
        label: 'Máy giặt',
        icon: GiWashingMachine,
        description: 'This property is in the countryside!',
        selected:false,
      },
      {
        label: 'Chổ để xe miễn phí',
        icon: AiFillCar,
        description: 'This property is close to the beach!',
        selected:false,
      },
      {
        label: 'Điều hòa',
        icon: TbAirConditioning,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Không gian làm việc',
        icon: MdTableRestaurant,
        description: 'This property is has windmills!',
        selected:false,
      },
    {
        label: 'Bể bơi',
        icon: TbPool,
        description: 'This property is close to the beach!',
        selected:false,
      },
      {
        label: 'Bồ tắm nước nóng',
        icon: FaBath,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Sân',
        icon: MdYard,
        description: 'This property is modern!',
        selected:false,
      },
      {
        label: 'Lò nướng BBQ',
        icon: GiGasStove,
        description: 'This property is in the countryside!',
        selected:false,
      },
      {
        label: 'Khu vực ngoài trời',
        icon: LiaUmbrellaBeachSolid,
        description: 'This property is close to the beach!',
        selected:false,
      },
      {
        label: 'Bếp đốt lửa trại',
        icon: GiCampingTent,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Bàn bi-da',
        icon: LuCalculator,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Lò sưởi ',
        icon: GiHeatHaze,
        description: 'This property is close to the beach!',
        selected:false,
      },
      {
        label: 'Đàn piano',
        icon: BiSolidPiano,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Thiết bị tập thể dục',
        icon: CgGym,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Lối ra hồ',
        icon: GiPoolDive,
        description: 'This property is close to the beach!',
        selected:false,
      },
      {
        label: 'Lối ra biển ',
        icon: TbBeachOff,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Sân trượt tuyết',
        icon: TbSkateboard,
        description: 'This property is modern!',
        selected:false,
      },
      {
        label: 'Vòi tắm hoa sen ngoài trời',
        icon: FaShower,
        description: 'This property is in the countryside!',
        selected:false,
      },
      {
        label: 'Máy báo khói',
        icon: GiSmokeBomb,
        description: 'This property is close to the beach!',
        selected:false,
      },
      {
        label: 'bộ sơ cứu ',
        icon: ImAidKit,
        description: 'This property is has windmills!',
        selected:false,
      },
      {
        label: 'Bình chữa cháy',
        icon: FaFireExtinguisher,
        description: 'This property is modern!',
        selected:false,
      },
      {
        label: 'Máy phát hiện khí CO',
        icon: TbWashMachine,
        description: 'This property is in the countryside!',
        selected:false,
      },
]
export const houseArr = [
    {
        label:"Sử dụng toàn bộ căn hộ",
        icon:BsHouseDoor,
        description:"Khách được sử dụng riêng toàn bộ chổ ở này."
    },
    {
        label:"Phòng riêng và có khu vực chung",
        icon:BsDoorOpen,
        description:"Khách sẽ có phòng riêng tron một ngôi nhà và được sử dụng những khu vực chung."
    },
    {
        label:"Ngủ trong phòng hoặc khu vực chung",
        icon:MdOutlineFamilyRestroom,
        description:"Khách ngủ trong phòng hoặc một khu vực chung - nơi bạn hoặc những người khác cùng sử dụng."
    }
]
export const whoArr = [
    {
        label:"single",
        icon:PiPersonArmsSpreadFill,
        description:"một người",
        selected: false,
    },
    {
        label:"couple",
        icon:MdGroup,
        description:"cặp đôi",
        selected: false,
    },
    {
        label:"family",
        icon:MdFamilyRestroom,
        description:"gia đình",
        selected: false,
    },
    {
        label:"group",
        icon:TiGroup,
        description:"hội bạn",
        selected: false,
    },

]

export const typeArr = [
    {
        label:"Yên Bình",
        icon:GiPeaceDove
    },
    {
        label:"Độc đáo",
        icon:GiWatchtower
    },
    {
        label:"Phù hợp cho gia đình",
        icon:TbHorseToy
    },
    {
        label:"Phong cách",
        icon:MdOutlineHouseSiding
    },
    {
        label:"vị trí trung tâm",
        icon:MdPlace
    },
    {
        label:"Rộng rãi",
        icon:TbViewportWide
    }
]
enum STEPS {
    START = 0,
    CATEGORY = 1,
    LOCATION = 2,
    INFO = 3,
    HOUSE =4,
    WHO = 5,
    OVERVIEW = 6,
    UTILITIES = 7,
    IMAGES = 8,
    DESCRIPTION = 9,
    TYPE = 10,
    OVERVIEW2 = 11,
    NIGHT = 12,
    PRICE = 13
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
            house: '',
            who:[],
            bathroomCount: 1,
            imageSrc: '',
            utilities:[],
            type: '',
            price: 1,
            title: '',
            night: '',
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

        axios.post('/api/listing3', data)
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
      const utilities = watch('utilities');
      const house = watch('house');
      const who = watch('who');
      const type = watch('type');
      
    
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

    // handle add utilities

    const handleUtilities = (value:string) =>{
        let sel ;
        // create variabel 
        let result:string[] =[...utilities];
        console.log(result)
       
        //check 
        if(result.length === 0)
        {
            result.push(value);
            sel = utilitiesArr.find((item)=>item.label === value)
            if(sel)
            {
                sel.selected = true;
            }
        }else{
            for(let i=0;i<result.length;i++)
            {
                if(result[i] === value)
                {
                    // set selected = false
                    let sal = utilitiesArr.find((item)=>item.label === value)
                    if(sal)
                    {
                        sal.selected = false;
                    }
                    //toggle
                   let re = result.filter((item:any) =>item !== value);
                   console.log(re);
                    setCustomValue("utilities", re);
                    return;
                }
            }
           result.push(value);
           sel = utilitiesArr.find((item)=>item.label === value)
            if(sel)
            {
                sel.selected = true;
            }
        }
        setCustomValue("utilities", result);
        
    }

    const checkSelected =(item:string)=>{
       let result = utilitiesArr.find(it=>it.label === item);
       if(result)
       {
        if(result.selected )
        {
            return true;
        }
       }
       return false;
    }

    const handleWho = (value: string) =>{
        let sel ;
        // create variabel 
        let result:string[] =[...who];
        console.log(result)
       
        //check 
        if(result.length === 0)
        {
            result.push(value);
            sel = whoArr.find((item)=>item.label === value)
            if(sel)
            {
                sel.selected = true;
            }
        }else{
            for(let i=0;i<result.length;i++)
            {
                if(result[i] === value)
                {
                    // set selected = false
                    let sal = whoArr.find((item)=>item.label === value)
                    if(sal)
                    {
                        sal.selected = false;
                    }
                    //toggle
                   let re = result.filter((item:any) =>item !== value);
                   console.log(re);
                    setCustomValue("who", re);
                    return;
                }
            }
           result.push(value);
           sel = whoArr.find((item)=>item.label === value)
            if(sel)
            {
                sel.selected = true;
            }
        }
        setCustomValue("who", result);
    }

    const checkWho =(item:string)=>{
        let result = whoArr.find(it=>it.label === item);
        if(result)
        {
         if(result.selected )
         {
             return true;
         }
        }
        return false;
     }

    let bodyContent = (
        <div className="md:grid grid-cols-2 gap-8 ">
           <div className="flex justify-center items-center">
                <span className=" mt-4 text-2xl md:text-4xl font-semibold text-center w-full md:w-2/3">Bắt đầu trên Airbnb thật dễ dàng</span>
           </div>
           <div className="px-4 py-8 ">
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
                                    selected ={category ===item.label}
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
            <div className="flex px-8 py-5  justify-center">
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

    if(step === STEPS.HOUSE)
    {
        bodyContent =(
            <div className="flex justify-center items-center w-full">
                <div className="w-full lg:w-1/2 flex flex-col gap-4 px-4">
                    <Header 
                        title="Khách có thể sử dụng loại phòng tắm nào?"
                        subtitle=""
                        big
                        center
                    />
                    <div className="flex flex-col gap-4 sm:mt-8 px-4">
                        {houseArr.map((item)=>{
                            return <CategoryInput 
                                        key={item.label}
                                        onClick={(value) =>setCustomValue('house',value)}
                                        selected = {house === item.label}
                                        icon ={item.icon}
                                        label={item.label}
                                        house
                                        description ={item.description}
                                    />
                        })}
                    </div>
                </div>
            </div>
        )
    }

    if(step ===STEPS.WHO)
    {
        bodyContent = (
            <div className="flex justify-center items-center w-full">
                <div className="flex flex-col gap-4 w-full md:w-1/2 px-4">
                    <Header 
                        title="đối tượng có thể thuê phòng của bạn ?"
                        subtitle="Bạn có thể chọn nhiều đối tượng khách hàng khác nhau, có thể thay đổi về sau."
                        big
                        center
                        />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:mt-4 md:mt-8 ">
                    {whoArr.map((item)=>{
                            return <UtilitiesInput 
                                        key={item.label}
                                        onClick={(value) =>handleWho(value)}
                                        selected ={checkWho(item.label)} 
                                        icon={item.icon}
                                        label={item.label}
                                    />
                        })}
                   </div>
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
                        src="/house-modal.webp"
                        alt="House Modal"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        )
    }

    if(step === STEPS.UTILITIES)
    {
        bodyContent = (
            <div className="flex flex-col gap-4 w-full flex flex-row justify-center items-center ">
               <div className="w-full px-4 sm:w-1/2 ">
                <Header 
                        title="Cho khách biết chỗ ở của bạn có những gì"
                        subtitle="Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê."
                        big
                        center
                    />
                    <div className="  max-h-[60vh] overflow-y-auto">
                                <div className="py-4">
                                    <p className="font-bold py-4">Bạn có nhưng tiện nghi cơ bản nào ?</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        { utilitiesArr.map((utility ) =>{
                                            return <UtilitiesInput 
                                                        key={utility.label}
                                                        onClick={(value)=>handleUtilities(value)}
                                                        label={utility.label}
                                                        icon = {utility.icon}
                                                        selected={checkSelected(utility.label)}
                                                    
                                                    />
                                        })}
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>
        )
    }

    if(step ===STEPS.IMAGES)
    {
        bodyContent = (
            <div className="flex flex-row justify-center items-center  ">
                <div className="w-full flex flex-col gap-4 md:w-1/2 px-4">
                    <Header 
                        title="Bổ sung bức ảnh chụp chỗ ở thuộc danh mục nhà nông trại của bạn"
                        subtitle="Về sau, bạn vẫn có thể đăng thêm hoặc thay đổi ảnh."
                        big
                    />
                    <ImageUpload 
                        value={imageSrc}
                        onChange={(value)=>setCustomValue('imageSrc',value)}
                    />
                </div>
            </div>
        )
    }


    if(step === STEPS.DESCRIPTION)
    {
        bodyContent =(
            <div className="flex justify-center items-center">
                <div className="flex flex-col gap-4 w-full sm:w-1/2 px-4">
                    <Header 
                        title="Bây giờ, hãy đặt tiêu đề cho chỗ ở thuộc danh mục nhà nông trại của bạn"
                        subtitle="Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi tiêu đề sau."
                        big
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
                        description
                        errors={errors}
                    />
                </div>
            </div>
        )
    }

    if(step === STEPS.TYPE)
    {
        bodyContent =(
            <div className="flex justify-center items-center w-full h-full px-4">
                <div>
                    <div className="mb-8 mt-4">
                        <Header 
                            title="Tiếp theo, hãy mô tả chỗ ở thuộc danh mục căn hộ của bạn"
                            subtitle="Chúng tôi sẽ sử dụng thông tin này để bắt đầu tạo nội dung mô tả của bạn."
                            big 
                            center
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto">
                        {typeArr.map((item)=>{
                            return <CategoryInput 
                                    key={item.label}
                                    onClick={(value)=>setCustomValue("type",value)}
                                    selected ={type === item.label}
                                    label={item.label}
                                    icon ={item.icon}
                                   />
                        })} 
                    </div>
                </div>
            </div>
        )
    }


    if(step === STEPS.OVERVIEW2)
    {
        bodyContent = (
            <div className="w-full h-full  flex justify-center items-center">
                <div className=" w-full px-4 sm:w-2/3 flex flex-col lg:flex-row justify-between items-center gap-4 pt-8">
                    <Header 
                        title="Hoàn thiện và đăng"
                        subtitle="Cuối cùng, bạn sẽ chọn bắt đầu với việc đón tiếp khách có kinh nghiệm hoặc không, sau đó bạn sẽ đặt giá theo đêm. Hãy trả lời một vài câu hỏi nhanh và đăng mục cho thuê khi bạn đã sẵn sàng."
                        big
                    />
                    <Image 
                        src="/house-modal.webp"
                        alt="House Modal"   
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        )
    }

    if(step === STEPS.NIGHT)
    {
        bodyContent =(
            <div className="w-full h-full  flex justify-center items-center">
                <div className=" w-full px-4 sm:w-2/3 flex flex-col lg:flex-col justify-between items-center gap-4 pt-8">
                <Header 
                    title="Bạn có sẵn phòng trong khoảng thời gian nào ?"
                    subtitle="Chọn ngày bạn có thể cho thuê phòng, có thể cập nhật trong thời gian tới."
                    center
                    big
                />
                   <div>
                    <div className="flex">
                        <div>Ngày bắt đầu :</div>
                        <div>{new Date().getDate()} thg</div>
                        <div>{new Date().getMonth()+1}-</div>
                        <div>{new Date().getFullYear()}</div>
                    </div>
                    <div>Ngày kết thúc :</div>
                    <Input 
                        id="night"
                        label="Night"
                        type="date"
                        register={register}
                        required
                        errors={errors}
                    />
                </div>
                </div>
            </div>
        )
    }
    if(step === STEPS.PRICE)
    {
        bodyContent =(
            <div className="flex justify-center items-centerpt-12 px-4 w-full h-full">
               <div className="flex flex-col gap-4 w-full sm:w-1/2 h-full">
                <Header 
                        title="Bây giờ, hãy đặt mức giá mà bạn muốn"
                        subtitle="Bạn có thể thay đổi giá này bất cứ lúc nào."
                        big 
                        center
                    />
                   <div className="w-full h-full">
                    <Input 
                            id="price"
                            label="Price"
                            type="number"
                            formatPrice
                            register={register}
                            errors={errors}
                            required
                        />
                   </div>
               </div>
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
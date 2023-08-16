"use client "

import useBook from '@/app/hooks/useBook'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeComment, SafeUser } from '@/app/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {useState,useEffect,useCallback} from 'react'
import { Range } from 'react-date-range'
import Calendar from '@/app/components/inputs/Calendar'
import { AiFillMinusCircle, AiFillStar } from 'react-icons/ai'
import { BiSolidDownArrow, BiSolidLeftArrow, BiSolidUpArrow } from 'react-icons/bi'
import { BsChevronCompactDown, BsDot } from 'react-icons/bs'
import { TbSquareRoundedPlusFilled } from 'react-icons/tb'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { initialDateRange } from '@/app/listings/[listingId]/ListingClient'

interface ListingBillMobileProps {
    price: number;
    totalPrice: number;
    countDay: number;
    dateRange: Range;
    isFixed: boolean;
    who: string[];
    guestCount: number;
    onChangeDate: (value:Range) =>void;
    disabled?: boolean;
    disabledDates: Date[];
    locationValue:  string;
    maxnight: string;
    currentUser: SafeUser | null;
    id:string;
    setDateRange: any;
    comments: SafeComment[]
}

const ListingBillMobile:React.FC<ListingBillMobileProps> =({
    price,
    totalPrice,
    countDay,
    dateRange,
    isFixed,
    who,
    guestCount,
    onChangeDate,
    disabledDates,
    disabled,
    locationValue,
    maxnight,
    currentUser,
    id,
    setDateRange,
    comments =[]
}) =>{
    const bookModel = useBook()
    const [isOpenListing,setIsOpenListing] = useState(bookModel.isOpen)
    const [isSelected , setIsSelected] = useState(false);
    const [isCalendar,setIsCalendar] = useState(true);
    const [countAdult,setCountAdult] = useState(1);
    const [countChild,setCountChild] = useState(0);
    const [countPet,setCountPet] = useState(0);
    const [isLoading,setIsLoading] = useState(false)

    const router = useRouter();
    const loginModal = useLoginModal();
    console.log(isOpenListing)
    console.log(bookModel.isOpen)

    // handle close book
    const handleCloseBook =()=>{
        setTimeout(()=>{
            bookModel.onClose()
        },300)
    }

    // handle count all star
    const handleCountAllStar = useCallback(()=>{
        let count = 0
        for(let i=0;i<comments.length;i++)
        {
            count += comments[i].start;
        }
        return  (count /comments.length).toFixed(2)
    },[comments])

   // handle open calendar
    const handleOpenCalendar = useCallback(()=>{
        setIsCalendar(!isCalendar);
    },[isCalendar]);

      // handle selected
      const handleSelected = useCallback(()=>{
            setIsSelected(!isSelected)
        },[isSelected])

      // handle add 
      const handleAdd =useCallback((number:number)=>{
        if(number <=1 || number >guestCount)
        {
            return 
        }
        
        setCountAdult(number)
    },[countAdult, guestCount])

    const handleMinus = useCallback((number:number)=>{
        if(number<1 || number >guestCount)
        {
            
            return 
        }
        
        setCountAdult(number)
    },[countAdult,guestCount])

    // handle add child
    const handleAddChild =useCallback((number:number)=>{
        if(number <=0 || number >10)
        {
           
            return 
        }
        
        setCountChild(number)
    },[countChild, guestCount])

    const handleMinusChild = useCallback((number:number)=>{
        if(number<0 || number >10)
        {
            return 
        }
        
        setCountChild(number)
    },[countChild])

    // add pet
    const handleAddPet =useCallback((number:number)=>{
        if(number <=0 || number >2)
        {
            return 
        }
        
        setCountPet(number)
    },[countPet, guestCount])

    const handleMinusPet = useCallback((number:number)=>{
        if(number<0 || number >2)
        {
            return 
        }
        
        setCountPet(number)
    },[countPet])

    // handle submit reservation
    const onCreateReservation = useCallback(()=>{
       if(!currentUser)
       {
        return loginModal.onOpen();
       }
       setIsLoading(true)

       axios.post('/api/reservations',{
        listingId: id,
        userId: currentUser.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
        adult:countAdult,
        pet:countPet,
        child:countChild
       })
       .then(()=>{
        toast.success("reservated!");
        router.refresh();
        setDateRange(initialDateRange)
       })
       .catch(()=>{
        toast.error("Something went wrong");
       }).finally(()=>{
        setIsLoading(false)
       })
    },[
        totalPrice,
        currentUser,
        dateRange,
        countChild,
        countPet,
        countAdult,
        id,
        router,
        loginModal
    ])


    useEffect(()=>{
        setIsOpenListing(bookModel.isOpen)
        
      },[bookModel.isOpen])
  
      if(!bookModel.isOpen)
      {
          return null;
      }
    return (
        <div
            className={`
                fixed
                w-full
                h-[100vh]
                top-0
                left-0
                bg-white
                z-50
               translate
               duration-500
                sm:hidden
               ${isOpenListing ?"translate-y-0":"translate-y-[100%]"}
               ${isOpenListing ?"opacity-100":"opacity-0"}
            `}
        >
            {/* header */}
            <div 
                className='
                    flex
                    justify-between
                    px-4
                    py-4
                    border-b-[1px]
                '
            >
                <div>
                    <BsChevronCompactDown
                        size={25}
                        onClick={handleCloseBook}

                    />
                </div>
                <div>
                    <Image
                        src="/logo.png"
                        width={70}
                        height={70}
                        alt='logo'
                    />
                </div>
            </div>
            {/* content */}
            <div className='max-h-[100vh] overflow-y-auto'>
            <div>

            <div className="flex justify-between items-center py-4 px-4">
                    {/* header */}
                    <p>
                        <span
                            className="font-light text-2xl "
                        >
                            {price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} 
                        </span>
                        /đêm
                    </p>
                    <div>
                        <div className="flex gap-1 cursor-pointer">
                            <div className="text-sm flex"><AiFillStar/>{handleCountAllStar()}<span className="flex items-center"><BsDot/></span><span className="underline font-bold">{comments.length} đánh giá</span></div>
                        </div>
                    </div>
                </div>
                
                <div className='w-full h-[7px] bg-neutral-100'></div>
                    <div className="grid grid-cols-2 m-4" onClick={handleOpenCalendar}>
                        <div className="border-[1px] border-r-[1px] text-[0.6rem] flex items-center px-2 ">
                            <div className=" uppercase">Nhận phòng:</div>
                            <div>
                                <div className='text-[0.6rem] font-light'>
                                    {dateRange.startDate?.getDate()} thg
                                    {dateRange.startDate?.getMonth()}-
                                    {dateRange.startDate?.getFullYear() } 
                                </div>
                            </div>
                        </div>
                        <div className="border-[1px] text-[0.6rem] flex items-center px-2 py-4 ">

                            <div className=" uppercase">
                            {
                                    dateRange.startDate?.getDate() === dateRange.endDate?.getDate() &&
                                    dateRange.startDate?.getMonth() === dateRange.endDate?.getMonth() &&
                                    dateRange.startDate?.getFullYear() === dateRange.endDate?.getFullYear() 
                                    ?
                                        ""
                                    : 
                                        "trả phòng :"
                                    }
                            </div>
                            <div>
                                <div className='text-[0.6rem] font-light'>
                                    {
                                    dateRange.startDate?.getDate() === dateRange.endDate?.getDate() &&
                                    dateRange.startDate?.getMonth() === dateRange.endDate?.getMonth() &&
                                    dateRange.startDate?.getFullYear() === dateRange.endDate?.getFullYear() 
                                    ?
                                        "Đặt phòng ở đây"
                                    : 
                                    dateRange.endDate?.getDate() +"thg"+
                                    dateRange.endDate?.getMonth() +"-"+
                                    dateRange.endDate?.getFullYear() 
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    {/* canlendar */}
                    <div 
                        className={`
                           px-2
                           shadow-md
                            w-full
                            h-auto
                            
                        `} 
                    >
                        <Calendar
                            value={dateRange}
                            disabledDates={disabledDates}
                            onChange={(value) => 
                            onChangeDate(value.selection)}
                            countDay = {countDay}
                            maxnight={maxnight}
                            
                        />
                        
                    </div>
                    <div className='w-full h-[7px] bg-neutral-100'></div>

            </div>
            <div className={`
                        flex
                        justify-center
                        items-center
                        transition
                       pb-4
                    }`}
                >
                   <div 
                    className="
                       
                       bg-white
                       rounded-lg
                        w-[100%]
                        px-4
                        py-4
                        
                    "
                   >
                    <div className="font-semibold pb-6 ">Chọn thành viên thuê phòng</div>
                    <div
                        className="
                            grid 
                            grid-cols-2
                            gap-2
                            justify-center
                            items-center
                        "
                    >
                        {who?.map(item =>{
                        if(item[0])
                        {
                            return (
                                    <label className="flex justify-between items-center ">{item}
                                        <input 
                                            type="radio" 
                                            checked={true}
                                            name="radio"
                                            className="px-2"
                                    />
                                    </label>
                            )
                        }else{
                            return (
                                <label className="flex justify-between items-center px-2">{item}
                                    <input 
                                        type="radio" 
                                        name="radio"
                                />
                                </label>
                        )
                        }
                        })}
                    </div>
                    <div className="flex justify-between items-center my-4">
                        <div >
                            <div className="font-bold">Người lớn</div>
                            <div className="font-light text-sm text-neutral-700">Từ 13 tuổi trở lên</div>
                        </div>
                        <div className="flex items-center gap-2">
                            
                            <span 
                                onClick={()=>handleMinus(countAdult-1)}
                                className={`${countAdult<= 1 ?"text-neutral-400 cursor-not-allowed": "text-neutral-950"} `}
                            >
                                <AiFillMinusCircle/>
                            </span>
                            <span className="">{countAdult}</span>
                            <span 
                                onClick={()=>handleAdd(countAdult+1)}
                                className={`${countAdult>=guestCount ?"cursor-not-allowed text-neutral-400":"cursor-pointer text-neutral-950"}`}
                                >
                                <TbSquareRoundedPlusFilled/>
                            </span>
                        </div>
                    </div>
                    {/* child */}
                    <div className="flex justify-between items-center my-4">
                        <div >
                            <div className="font-bold">Trẻ em </div>
                            <div className="font-light text-sm text-neutral-700">Từ dưới 12 tuổi</div>
                        </div>
                        <div className="flex items-center gap-2">
                            
                            <span 
                                onClick={()=>handleMinusChild(countChild-1)}
                                className={`${countChild<= 0 ?"text-neutral-400 cursor-not-allowed": "text-neutral-950"} `}
                            >
                                <AiFillMinusCircle/>
                            </span>
                            <span className="">{countChild}</span>
                            <span 
                                onClick={()=>handleAddChild(countChild+1)}
                                className={`${countChild>=10 ?"cursor-not-allowed text-neutral-400":"cursor-pointer text-neutral-950"}`}
                                >
                                <TbSquareRoundedPlusFilled/>
                            </span>
                        </div>
                    </div>
                    {/* pet */}
                    <div className="flex justify-between items-center my-4">
                        <div >
                            <div className="font-bold">Thú cưng </div>
                            <div className="font-light text-sm text-neutral-700">Bạn có mang theo thú cưng chứ ? </div>
                        </div>
                        <div className="flex items-center gap-2">
                            
                            <span 
                                onClick={()=>handleMinusPet(countPet-1)}
                                className={`${countPet<= 0 ?"text-neutral-400 cursor-not-allowed": "text-neutral-950"} `}
                            >
                                <AiFillMinusCircle/>
                            </span>
                            <span className="">{countPet}</span>
                            <span 
                                onClick={()=>handleAddPet(countPet+1)}
                                className={`${countPet>=2?"cursor-not-allowed text-neutral-400":"cursor-pointer text-neutral-950"}`}
                                >
                                <TbSquareRoundedPlusFilled/>
                            </span>
                        </div>
                    </div>
                    <div
                        className="
                            text-[15px] 
                            font-light
                            py-4
                        "
                    >
                        Chỗ ở này cho phép tối đa {guestCount} khách, không tính em bé. Nếu bạn mang theo nhiều hơn 2 thú cưng, vui lòng báo cho Chủ nhà biết.
                    </div>
                    
                   </div>
                </div>
                <div className='w-full h-[7px] bg-neutral-100'></div>
                {/* TOTAL PRICE */}
                <div className='p-4 mb-[6rem]'>
                    {countDay !== 0 ? (
                        <div>
                            <button 
                                onClick={onCreateReservation}
                                className="
                                    rounded-lg
                                    disabled:opacity-70
                                    disabled:cursor-pointer
                                    hover:opacity-80
                                    px-2
                                    py-1
                                    w-full
                                    bg-rose-600
                                    border-none
                                    text-white
                                "
                            >
                                Đặt phòng
                            </button>
                                
                            <div className="text-center text-sm font-light py-2">
                                Bạn vẫn chưa bị trừ tiền
                            </div>
                        </div>
                    ):(
                        <div>
                            <button 
                                className="
                                    rounded-lg
                                    disabled:opacity-70
                                    disabled:cursor-pointer
                                    hover:opacity-80
                                    px-2
                                    py-1
                                    w-full
                                    bg-rose-600
                                    border-none
                                    text-white
                                "
                            >
                                Kiểm ra tình trạng còn phòng
                            </button>
                            <div className="text-center text-sm font-light py-2">
                                Kiểm tra lịch đặt phòng và số lượng thành viên để đặt phòng
                            </div>
                        </div>
                    )}
                    {countDay !== 0 && (
                        <div className="py-2 text-sm font-light flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div><span>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} </span> x <span>{countDay} đêm</span></div>
                            <div>{totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div><span>Phí dịch vụ</span></div>
                            <div>{((price * countDay)*0.1).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} </div>
                        </div>
                        <hr />
                        <div className="flex justify-between items-center">
                            <div>
                                Tổng trước thuế
                            </div>
                            <div>
                                {Math.round(totalPrice +((price * countDay)*0.1)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) } 
                            </div>
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListingBillMobile
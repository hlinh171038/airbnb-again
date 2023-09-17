"use client"
import { TbAdjustmentsHorizontal, TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from './CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useFilter from '@/app/hooks/useFilter';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 9
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};


export const categories = [
    {
      label: 'Biển',
      icon: TbBeach,
      description: 'Nơi bạn ở giáp biển !',
    },
    {
      label: 'Cối xoay ',
      icon: GiWindmill,
      description: 'Cánh đồng cối xoay gió!',
    },
    {
      label: 'Hiện đại',
      icon: MdOutlineVilla,
      description: 'Thành thị hiện đại, sôi động, nhiều tiện ích!'
    },
    {
      label: 'Vùng quê',
      icon: TbMountain,
      description: 'Vùng đồng quê yên bình, thư giản!'
    },
    {
      label: 'Hồ bơi',
      icon: TbPool,
      description: 'Nhà ở có hồ bơi cá nhân!'
    },
    {
      label: 'Đảo',
      icon: GiIsland,
      description: 'Vùng đảo!'
    },
    {
      label: 'Hồ ',
      icon: GiBoatFishing,
      description: 'Gần hồ tự nhiên, mát mẻ, trong lành!'
    },
    {
      label: 'Băng',
      icon: FaSkiing,
      description: 'Vùng băng tuyết phủ, trải nghiệm, khám phá!'
    },
    {
      label: 'Lâu đài',
      icon: GiCastle,
      description: 'Kiến trúc lâu đài!'
    },
    {
      label: 'Hang',
      icon: GiCaveEntrance,
      description: 'Hang động phục chế !'
    },
    {
      label: 'Cấm trại',
      icon: GiForestCamp,
      description: 'Khu vực cấm trại!'
    },
    {
      label: 'Vùng cực',
      icon: BsSnow,
      description: 'Tái hiện vùng cực !'
    },
    {
      label: 'Sa mạc',
      icon: GiCactus,
      description: 'Khu vực tái phục dựng sa mạc'
    },
    {
      label: 'Nhà chồi',
      icon: GiBarn,
      description: 'Nhà chồi trên đồi !'
    },
    {
      label: 'Nhà Lux',
      icon: IoDiamond,
      description: 'Kiến trúc Luxury sang trọng bậc nhất Airbnb!'
    }
  ]
const Categories =() =>{
    const fillterModal = useFilter();
    const params = useSearchParams();// take param from url
    const pathname = usePathname(); // take path name exist in url

    const categoryLink = params?.get('category');
    // console.log(pathname)

    const ismainPage = pathname === '/';
    if(!ismainPage){
        return null;
    }
    
    return (
        <div className=' flex items-center justify-between px-4'>
          <div
              className='
              w-full
                md:w-[90%]
              '
          >
            <Carousel responsive={responsive} arrows={true} renderArrowsWhenDisabled={true}>
              {categories.map((category)=>{
                    return <CategoryBox
                        key={category.label}
                        label={category.label}
                        icon ={category.icon}
                        selected={categoryLink ===category.label ? true : false}
                        description={category.description}
                    />
                })}
            </Carousel>
              
          </div>
          <div onClick={()=>fillterModal.onOpen()} className=' hidden md:block border-[2px] px-6 py-2 rounded-md cursor-pointer' >
            <TbAdjustmentsHorizontal />
          </div>
        </div>
    )
}

export default Categories
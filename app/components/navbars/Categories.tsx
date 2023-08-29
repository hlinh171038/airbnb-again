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
      description: 'This property is close to the beach!',
    },
    {
      label: 'Cối xoay ',
      icon: GiWindmill,
      description: 'This property is has windmills!',
    },
    {
      label: 'Hiện đại',
      icon: MdOutlineVilla,
      description: 'This property is modern!'
    },
    {
      label: 'Vùng quê',
      icon: TbMountain,
      description: 'This property is in the countryside!'
    },
    {
      label: 'Hồ bơi',
      icon: TbPool,
      description: 'This is property has a beautiful pool!'
    },
    {
      label: 'Đảo',
      icon: GiIsland,
      description: 'This property is on an island!'
    },
    {
      label: 'Hồ ',
      icon: GiBoatFishing,
      description: 'This property is near a lake!'
    },
    {
      label: 'Băng',
      icon: FaSkiing,
      description: 'This property has skiing activies!'
    },
    {
      label: 'Lâu đài',
      icon: GiCastle,
      description: 'This property is an ancient castle!'
    },
    {
      label: 'Hang',
      icon: GiCaveEntrance,
      description: 'This property is in a spooky cave!'
    },
    {
      label: 'Cấm trại',
      icon: GiForestCamp,
      description: 'This property offers camping activities!'
    },
    {
      label: 'Vùng cực',
      icon: BsSnow,
      description: 'This property is in arctic environment!'
    },
    {
      label: 'Sa mạc',
      icon: GiCactus,
      description: 'This property is in the desert!'
    },
    {
      label: 'Nhà chồi',
      icon: GiBarn,
      description: 'This property is in a barn!'
    },
    {
      label: 'Nhà Lux',
      icon: IoDiamond,
      description: 'This property is brand new and luxurious!'
    }
  ]
const Categories =() =>{

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
          <div className=' hidden md:block border-[2px] px-6 py-2 rounded-md cursor-pointer' >
            <TbAdjustmentsHorizontal />
          </div>
        </div>
    )
}

export default Categories
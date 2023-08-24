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
    items: 6
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
  }
};


export const categories = [
    {
      label: 'Beach',
      icon: TbBeach,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Windmills',
      icon: GiWindmill,
      description: 'This property is has windmills!',
    },
    {
      label: 'Modern',
      icon: MdOutlineVilla,
      description: 'This property is modern!'
    },
    {
      label: 'Countryside',
      icon: TbMountain,
      description: 'This property is in the countryside!'
    },
    {
      label: 'Pools',
      icon: TbPool,
      description: 'This is property has a beautiful pool!'
    },
    {
      label: 'Islands',
      icon: GiIsland,
      description: 'This property is on an island!'
    },
    {
      label: 'Lake',
      icon: GiBoatFishing,
      description: 'This property is near a lake!'
    },
    {
      label: 'Skiing',
      icon: FaSkiing,
      description: 'This property has skiing activies!'
    },
    {
      label: 'Castles',
      icon: GiCastle,
      description: 'This property is an ancient castle!'
    },
    {
      label: 'Caves',
      icon: GiCaveEntrance,
      description: 'This property is in a spooky cave!'
    },
    {
      label: 'Camping',
      icon: GiForestCamp,
      description: 'This property offers camping activities!'
    },
    {
      label: 'Arctic',
      icon: BsSnow,
      description: 'This property is in arctic environment!'
    },
    {
      label: 'Desert',
      icon: GiCactus,
      description: 'This property is in the desert!'
    },
    {
      label: 'Barns',
      icon: GiBarn,
      description: 'This property is in a barn!'
    },
    {
      label: 'Lux',
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
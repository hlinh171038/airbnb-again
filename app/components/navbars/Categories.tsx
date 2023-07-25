"use client"
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
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


export const  categories =[
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
]
const Categories =() =>{

    const params = useSearchParams();// take param from url
    const pathname = usePathname(); // take path name exist in url

    const categoryLink = params?.get('category');
    console.log(pathname)

    const ismainPage = pathname === '/';
    if(!ismainPage){
        return null;
    }
    
    return (
        <div
            className='
                flex
                flex-row
                justify-between
                pt-4
                overflow-x-auto
            '
        >
            {categories.map((category)=>{
                return <CategoryBox
                    key={category.label}
                    label={category.label}
                    icon ={category.icon}
                    selected={categoryLink ===category.label ? true : false}
                    description={category.description}
                />
            })}
        </div>
    )
}

export default Categories
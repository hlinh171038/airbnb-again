"use client"

import useSearchModal from '@/app/hooks/useSearch'
import {BiSearch} from 'react-icons/bi'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import {useCallback} from 'react'

const Search = () =>{
    const searchModal = useSearchModal()

    const handleOpenSearch = useCallback(()=>{
        searchModal.onOpen()
        console.log(searchModal.isOpen)
        console.log('try')
    },[searchModal])
    return (
        <div
            onClick={handleOpenSearch}
            className="
                border-[1px]
                rounded-full
                hover:shadow-lg
                px-2
                py-1
                transition
                cursor-pointer
                w-full
                shadow-md
                md:shadow-none
                md:w-auto
            "
        >   
            <div
                className="
                    flex
                    flex-row
                    justify-between
                    gap-4
                    items-center
                "
            >
                <div className='flex md:hidden gap-4 md:gap-2'>
                    <div
                        className="
                            p-2
                            rounded-full
                            bg-rose-500
                            text-white
                            flex
                            justify-center
                            items-center
                            w-[37px]
                            h-[37px]
                            md:hidden
                        "
                    >
                        <BiSearch />
                    </div>
                    <div className='md:grid md:grid-cols-2 justify-center items-center'>
                        <div className=" border-none text-sm font-bold md:border-r-[0px] sm:border-r-[1px]   w-full sm:w-auto">
                            Địa điểm
                        </div>
                        <div className='flex flex-row gap-2 text-[0.7rem] '>
                            <div className="border-none md:border-r-[1px] w-full" >
                                Tuần 
                            </div>
                            <div className=" w-full min-w-[80px]">
                                thêm khách
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex justify-between items-center cursor-pointer'>
                    <div className='border-r-[1px] px-4 text-sm font-light'>Bất kì địa điểm nào</div>
                    <div className='border-r-[1px] px-4 text-sm font-light'>Bất kì tuần nào</div>
                    <div className='border-r-[1px] px-4 text-sm font-light'>Thêm khách</div>
                </div>
                <div
                    className="
                        hidden
                        p-2
                        rounded-full
                        bg-rose-500
                        text-white
                        md:flex
                        justify-end
                       hover:bg-rose-600
                       transition-all
                    "
                >
                    <BiSearch />
                </div>
                <div
                    className="
                        p-2
                        rounded-full
                        border-[2px]
                        flex
                        justify-end
                        md:hidden
                    "
                >
                    <TbAdjustmentsHorizontal />
                </div>
            </div>
        </div>
    )
}

export default Search
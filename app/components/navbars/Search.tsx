"use client"

import {BiSearch} from 'react-icons/bi'

const Search = () =>{
    return (
        <div
            className="
                border-[1px]
                rounded-full
                hover:shadow-lg
                px-2
                py-1
                transition
                cursor-pointer
                w-full
                md:w-auto
            "
        >   
            <div
                className="
                    flex
                    flex-row
                    sm:justify-between
                    justify-end
                    items-center
                "
            >
                <div className=" border-r-[0px] sm:border-r-[1px]  px-2 w-full sm:w-auto">
                    Anywhere
                </div>
                <div className="border-r-[1px] px-2 hidden sm:block" >
                    Any week
                </div>
                <div className="px-2 hidden sm:block">
                    Add guest
                </div>
                <div
                    className="
                        p-2
                        rounded-full
                        bg-rose-500
                        text-white
                        flex
                        justify-end
                    "
                >
                    <BiSearch />
                </div>
            </div>
        </div>
    )
}

export default Search
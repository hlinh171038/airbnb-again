"use client"

import { IconType } from "react-icons/lib"
import {useCallback} from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string';

interface CategoryBoxProps {
    icon:IconType;
    label: string;
    description?: string;
    selected?: boolean
}
const CategoryBox:React.FC<CategoryBoxProps> =({
    icon:Icon,
    label, 
    description,
    selected
}) =>{
    const router = useRouter();
    const param = useSearchParams();// to take param fomr url

    // handle click to retrive and check url (params client)
    const handleClick = useCallback(()=>{
        // create new empty currentQuery
        let currentQuery = {};
        // update (add method category for url)
        const updateQuery: any ={
            ...currentQuery,
            category: label
        }
        // check params is exist
        if(param) {
            // yes, --> qs.parse current params
            currentQuery = qs.parse(param.toString())
        }
            
        // if current params exist is toggle ( exist --> delete)
        if(param?.get('category') === label)
        {
            delete updateQuery.category;
        }
        // take completed url
        const url = qs.stringifyUrl({
            url:"/",
            query:updateQuery
        },{skipNull: true})
        // use router.push url
        router.push(url)

    },[label,param,router])
    return (
        <div
            onClick={handleClick}
            className={`
            cursor-pointer
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-1
            border-b-2
            hover:text-neutral-800
            transition
            ${selected ?'border-b-neutral-800' : 'border-transparent'}
            ${selected ?'text-neutral-800' : 'text-neutral-500'}
            `}
        >
            <Icon size={26} />
            <div
                className="text-sm font-medium"
            >
                {label}
            </div>
        </div>
    )
}

export default CategoryBox
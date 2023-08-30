"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from 'query-string';


interface InformationMenuItemProps {
    label: string;
    selected: boolean;
}
const InformationMenuItem:React.FC<InformationMenuItemProps> =({
    label,
    selected
}) =>{
    const params = useSearchParams();
    const router = useRouter()
    const handleUrl = useCallback(()=>{
        let currentQuery = {};

        // update current query
        let updateQuery:any = {
            ...currentQuery,
            category: label
        }
        // check params
        if(params){
            currentQuery = queryString.parse(params.toString())
        }
        //check params === label
        if(params?.get('category')===label){
            delete updateQuery.category
        }

        // create whole part of url
        const url = queryString.stringifyUrl({
            url:'/informations/',
            query: updateQuery
        },{skipNull:true});

        // push router
        router.push(url);
    },[params,router])
    return (
        <div
            onClick={handleUrl}
            className={`
                hover:opacity-[0.8]
                capitalize
                font-bold
                text-md
                cursor-pointer
                transition-all
                ${selected ? "text-rose-600":"text-neutral-600"}
                ${selected ? "border-b-[1px] border-rose-600":" borde-none"}
            `}
        >
            {label}
        </div>
    )
}

export default InformationMenuItem
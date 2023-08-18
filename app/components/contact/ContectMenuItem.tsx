"use client"

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";


interface ContectMenuItemProps {
    label: string;
    description: string;
    selected: boolean;
}
const ContectMenuItem:React.FC<ContectMenuItemProps> = ({
    label,
    description,
    selected
}) =>{
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(()=>{
        let currentQuery = {}
        // add category
        const updateQuery: any = {
            ...currentQuery,
            category: label
        }
        //console.log(updateQuery)
        // look throught check params and pass current query
        if(params)
        {
            currentQuery = queryString.parse(params.toString())
        }

        if(params?.get('category') === label)
        {
            delete updateQuery.category;
        }
        const url = queryString.stringifyUrl({
            url:'/contact/',
            query:updateQuery
        },{skipNull: true});

        router.push(url);
    },[label,params, router])
    return (
        <div
            onClick={handleClick}
            className={`
                ${selected && "underline"}
            `}
        >
           {label}
        </div>
    )
}

export default ContectMenuItem
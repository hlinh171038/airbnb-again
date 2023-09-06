"use client"

import useFilter from "@/app/hooks/useFilter"
import Modals from "./Modals"

const FilterModal = () =>{
    const filterModal = useFilter()
    return (
        <Modals
            isOpen = {filterModal.isOpen}
            onClose={()=>filterModal.onClose()}
            onSubmit={()=>{}}
            title="filter Product"
            actionLabel=""
        />
    )
}

export default FilterModal



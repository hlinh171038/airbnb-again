"use client"

import { useEffect} from 'react';

import EmptyState from './components/EmptyState';


interface ErrorProps {
    error:Error
}
const Error:React.FC<ErrorProps> = ({
    error
}) =>{

    useEffect(()=>{
        console.error(error);
    },[error]);
    return (
        <EmptyState 
            title='Uh Oh'
            subtitle='Đã xảy ra một số trục trặc'
        />
    )
}

export default Error
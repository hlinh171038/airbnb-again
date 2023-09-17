"use client"

import useCountries from '@/app/hooks/useCountries';
import Image from 'next/image';
import Select from 'react-select';

export type CountrySelectValue = {
    flag: string,
    label: string,
    latlng:number[],
    region: string,
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value:CountrySelectValue) => void
}

const CountrySelect:React.FC<CountrySelectProps> =({
    value,
    onChange
}) =>{
    const {getAll} = useCountries()
    return (
        <Select
        required={value === null}
        placeholder="Any where"
        value={value}
        onChange={(value)=>onChange(value as CountrySelectValue)}
        options={getAll()}
        isClearable
        formatOptionLabel={(option:any)=>(
            <div
                className='
                    flex
                    items-center
                    gap-3
                '
            >
                <Image 
                    src={`https://flagcdn.com/${option.value.toLowerCase()+'.svg'}`}
                    width={30} 
                    height={30}
                    alt="Sounth Africa" 
                />
                <div>
                    {option.label}
                    <span className='text-neutral-800 ml-1'>{option.region}</span>
                </div>
            </div>
        )}
      />
    )
}

export default CountrySelect
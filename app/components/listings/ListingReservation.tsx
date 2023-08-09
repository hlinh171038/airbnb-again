"use client"

import {Range} from 'react-date-range'
import Calendar from '../inputs/Calendar';
import useCountries from '@/app/hooks/useCountries';

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value:Range) =>void;
    dateRange: Range;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
    countDay: number;
    locationValue:  string;
}

const ListingReservation:React.FC<ListingReservationProps> =({
    price,
    totalPrice,
    onChangeDate,
    onSubmit,
    dateRange,
    disabledDates,
    disabled,
    countDay,
    locationValue
}) => {
    const {getByValue} = useCountries()

    const location = getByValue(locationValue)

    console.log(dateRange.startDate)
    console.log(new Date(dateRange.startDate as Date) )
    return <div className="mt-6">
                {/* <div>{price} vnd / night</div> */}
                <p className='text-lg font-semibold'>Bạn ở đây bao nhiêu đêm</p>
                <div className='flex items-center'>
                    <div className='text-sm font-light'>
                        {dateRange.startDate?.getDate()} thg
                        {dateRange.startDate?.getMonth()}-
                        {dateRange.startDate?.getFullYear() } 
                    </div>
                    <div className='text-sm font-light'>
                        {dateRange.endDate?.getDate()} thg
                        {dateRange.endDate?.getMonth()}-
                        {dateRange.endDate?.getFullYear() } 
                        
                    </div>
                </div>
                <div className='font-light py-4'>{countDay} đêm tại {location?.region} - {location?.label} - {price} vnđ / đêm </div>
                <Calendar
                    value={dateRange}
                    disabledDates={disabledDates}
                    onChange={(value) => 
                    onChangeDate(value.selection)}
                    countDay = {countDay}
                />
           </div>
}

export default ListingReservation
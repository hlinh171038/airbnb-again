"use client"

import {DateRange, Range} from 'react-date-range'
import Calendar from '../inputs/Calendar';
import useCountries from '@/app/hooks/useCountries';

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value:Range) =>void;
    dateRange: Range;
    disabled?: boolean;
    disabledDates: Date[];
    countDay: number;
    locationValue:  string;
    maxnight: string
}

const ListingReservation:React.FC<ListingReservationProps> =({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    disabledDates,
    disabled,
    countDay,
    locationValue,
    maxnight
}) => {
    const {getByValue} = useCountries()

    const location = getByValue(locationValue)

    console.log(dateRange.startDate)
    console.log(new Date(dateRange.startDate as Date) )
    return <div className="mt-6">
                {/* <div>{price} vnd / night</div> */}
                <p className='text-lg font-semibold'>Dịch vụ sẵn sàng cho những đêm</p>
                <div className='flex items-center'>
                    <div className='text-sm font-light'>
                        {dateRange.startDate?.getDate()} thg
                        {dateRange.startDate?.getMonth()}-
                        {dateRange.startDate?.getFullYear() } 
                    </div>
                    <span className='px-4'> - </span>
                    <div className='text-sm font-light'>
                        {new Date(maxnight)?.getDate()} thg
                        {new Date(maxnight)?.getMonth()} -
                        {new Date(maxnight)?.getFullYear()} 
                    </div>
                </div>
                <div className='font-light py-4'> {location?.region} - {location?.label} - {price} vnđ / đêm </div>
                <DateRange 
                    rangeColors={["#262626"]}
                    minDate={dateRange.startDate}
                    maxDate={maxnight ? new Date(maxnight): new Date()}
                />
           </div>
}

export default ListingReservation
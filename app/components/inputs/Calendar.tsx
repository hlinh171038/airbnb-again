'use client';

import { 
  DateRange, 
  Range, 
  RangeKeyDict
} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value?: Range,
  onChange?: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  countDay: number,
  maxnight?: string
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
  countDay,
  maxnight
}) => {
  return ( 
    <DateRange
      rangeColors={['#262626']}
      ranges={[value as Range]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      maxDate={maxnight ? new Date(maxnight) : new Date()}
      disabledDates={disabledDates}
    />
   );
}
 
export default DatePicker;
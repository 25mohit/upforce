"use client"
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';

const Date = ({ placeholder, onChange, value, error }) => {
    const [uniqueKey, setUniqueKey] = useState()
    const [isFocused, setIsFocused] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
      function randomNum() {
        const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
        return randomNumber.toString();
      }
      setUniqueKey(randomNum());
    },[])

    useEffect(() => {
      if(value?.length){
        setSelectedDate(dayjs(value))
      }
    },[value])

    const handleDateChange = (newValue) => {
      setSelectedDate(newValue);   
      setIsFocused(false)   
      if (onChange) {
        const isoString = dayjs(newValue).toISOString();
        onChange(isoString);
      }
    };

  return (
    <div id="asdasd" className={`date-field relative w-full rounded-md input ${error ? 'error' : ''}`} onClick={() => !isFocused ? setIsFocused(!isFocused) : null}>
      {/* Label/Placeholder */}
      <label
        className={`absolute left-2 top-0 ml-2 ${selectedDate !== null ? 'text-black' : 'text-gray-500'} transition-all duration-300 ease-in-out transform ${
          isFocused ? '-translate-y-4 ml-0 text-sm bg-blue-600 text-white px-2 rounded-sm' : 'translate-y-2 text-base'
        }`}
        id={uniqueKey}
      >
        {value?.length > 0 ? moment(dayjs(value).toISOString()).format("MMM Do YY") : (error !== undefined && error?.length) ? error : placeholder}
      </label>
      <div className="date-ui absolute">
        {isFocused && 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={selectedDate} onChange={handleDateChange}/>
        </LocalizationProvider> }
      </div>
    </div>
  )
}

export default Date
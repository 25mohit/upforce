"use client"
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';

const Date = ({ placeholder, onChange, value }) => {
    const [uniqueKey, setUniqueKey] = useState()
    const [isFocused, setIsFocused] = useState(false); // Manage focus state
    const [selectedDate, setSelectedDate] = useState(null); // Date state

    useEffect(() => {
        function randomNum() {
            const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
            return randomNumber.toString();
        }
        setUniqueKey(randomNum());
    },[])

    useEffect(() => {
      if(value?.length){
        setSelectedDate(value)
      }
    },[value])

    const handleDateChange = (newValue) => {
      setSelectedDate(newValue);
      console.log(newValue);
      
      if (onChange) {
        const isoString = dayjs(newValue).toISOString();
        onChange(isoString); // Pass the selected date to onChange prop
      }
    };

    console.log("selectedDate", selectedDate?.length, value);

  return (
    <div id="asdasd" className="date-field relative w-full rounded-md" onClick={() => setIsFocused(!isFocused)}>
      {/* Label/Placeholder */}
      <label
        className={`absolute left-2 top-0 ml-2 ${selectedDate !== null ? 'text-black' : 'text-gray-500'} transition-all duration-300 ease-in-out transform ${
          isFocused ? '-translate-y-4 ml-0 text-sm bg-blue-600 text-white px-2 rounded-sm' : 'translate-y-2 text-base'
        }`}
        id={uniqueKey}
      >
        {selectedDate?.length > 0 ? moment(dayjs(selectedDate).toISOString()).format("MMM Do YY") : placeholder}
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
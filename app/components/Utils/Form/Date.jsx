"use client"
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Date = ({ type, placeholder }) => {
    const [uniqueKey, setUniqueKey] = useState()
    const [isFocused, setIsFocused] = useState(false); // Manage focus state

    useEffect(() => {
        function randomNum() {
            const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
            return randomNumber.toString();
        }
        setUniqueKey(randomNum());
    },[])
    
  return (
    <div id="asdasd" className="date-field relative w-full rounded-md" onClick={() => setIsFocused(!isFocused)}>
      {/* Label/Placeholder */}
      <label
        className={`absolute left-2 top-0 ml-2 text-gray-500 transition-all duration-300 ease-in-out transform ${
          isFocused ? '-translate-y-4 ml-0 text-sm bg-blue-600 text-white px-2 rounded-sm' : 'translate-y-2 text-base'
        }`}
        id={uniqueKey}
      >
        {placeholder}
      </label>
      <div className="date-ui absolute">
        {isFocused && <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
        </LocalizationProvider> }
      </div>
    </div>
  )
}

export default Date
'use client'
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ type, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false); // Manage focus state
  const [showPass, setShowPass] = useState(false)
  const [uniqueKey, setUniqueKey] = useState()

  useEffect(() => {
    setUniqueKey(new Date().getTime())
  },[])
  
  return (
    <div className="relative w-full">
      {/* Label/Placeholder */}
      <label
        className={`absolute pointer-events-none left-2 ml-2 text-gray-500 transition-all duration-300 ease-in-out transform ${
          isFocused ? '-translate-y-4 ml-0 text-sm bg-blue-600 text-white px-2 rounded-sm' : 'translate-y-2 text-base'
        }`}
        id={uniqueKey}
      >
        {placeholder}
      </label>
      {/* Input Field */}
      <input
        id={uniqueKey}
        type={type === 'password' ? (showPass ? 'text' : 'password') : type}
        className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => !e.target.value && setIsFocused(false)} // Keep label up if input is filled
      />
      {
        type === 'password' && ( !showPass ? <FaEye onClick={() => setShowPass(!showPass)} className='absolute right-3 cursor-pointer bottom-3 text-gray-400'/> : <FaEyeSlash onClick={() => setShowPass(!showPass)} className='absolute right-3 cursor-pointer bottom-3 text-gray-400'/>)
      }
    </div>
  );
};

export default Input;

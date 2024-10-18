"use client"
import { useEffect, useRef, useState } from 'react';

const SelectComponent = ({ placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const selectRef = useRef(null);

  // Automatically focus the select element when isFocused becomes true
  useEffect(() => {
    if (isFocused && selectRef.current) {
      selectRef.current.focus();
    }
  }, [isFocused]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);  // Capture selected value
    setIsFocused(false);  // Close the dropdown after selection
  };

  const uniqueKey = "uniqueSelect"; // You can change this to your unique key logic

  return (
    <div className="select relative w-full rounded-md" onClick={() => setIsFocused(true)}>
      {/* Label/Placeholder */}
      <label
        className={`absolute left-2 top-0 ml-2 text-gray-500 transition-all duration-300 ease-in-out transform ${
          isFocused ? '-translate-y-4 ml-0 text-sm bg-blue-600 text-white px-2 rounded-sm' : 'translate-y-2 text-base'
        }`}
        id={uniqueKey}
      >
        {placeholder}
      </label>

      {isFocused && (
        <select
          className='absolute'
          ref={selectRef}
          name=""
          id=""
          value={selectedValue}
          onChange={handleSelectChange} // Handle selection change
        >
          <option value="">Select a Value</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      )}
    </div>
  );
};

export default SelectComponent;

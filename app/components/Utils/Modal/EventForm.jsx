import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Button from '../Form/Button';
import Input from '../Form/Input';
import Date from '../Form/Date';
import Select from '../Form/Select';

const EventForm = ({ isActive, setIsActive }) => {
    
  return (
    <div className='event-form fixed'>
        <div className={`modal ${isActive ? 'active' : 'inactive'}`}>
            <header className='flex justify-between items-center'>
                <h1>Add new Event</h1>
                <AiOutlineClose className='cursor-pointer' onClick={() => setIsActive(false)}/>
            </header>
            <form action="post" className='flex flex-col'>
                <Input type="text" placeholder="Enter Event Name"/>
                <Date placeholder="Event Date"/>
                <select className='select'>
                    <option>Select a Value</option>
                </select>
                {/* <Select placeholder="Select Status" /> */}
                <Button label="Create Event"/>
            </form>
        </div>
    </div>
  )
}

export default EventForm
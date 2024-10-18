import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Button from '../Form/Button';
import Input from '../Form/Input';
import Date from '../Form/Date';
import Select from '../Form/Select';

const EventForm = () => {
  return (
    <div className='event-form fixed'>
        <div className="modal">
            <header className='flex justify-between items-center'>
                <h1>Add new Event</h1>
                <AiOutlineClose />
            </header>
            <form action="post" className='flex flex-col gap-4'>
                <Input type="text" placeholder="Enter Event Name"/>
                <div className="flex flex-wrap">
                    <Date />
                    <Select />
                </div>
                <Button label="Create Event"/>
            </form>
        </div>
    </div>
  )
}

export default EventForm
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Button from '../Form/Button';
import Input from '../Form/Input';
import Date from '../Form/Date';
import Select from '../Form/Select';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewEvent, GetUserEvents } from '@/redux/slices/eventsSlice';

const EventForm = ({ isActive, setIsActive, editData, setEditData }) => {
    
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        status: ''
    })

    const response = useSelector((state) => state?.settings?.response)
    const dispatch = useDispatch()

    useEffect(() => {
        if(editData && Object.keys(editData).length > 0){
            setFormData(editData)
        } 
        console.log("formData", formData, editData, response);
    },[isActive, editData])    

    useEffect(() => {
        if(response && Object.keys(formData).length > 0){
            if(response?._id !== undefined){
                setFormData({})
                setIsActive(false)
                dispatch(GetUserEvents())
            }
        }
    },[response])
    // console.log("formData", formData, response);
    
    const onClickHandler = e => {
        e.preventDefault()
        dispatch(AddNewEvent(formData))
    }

    const onCloseHandler = () => {
        setFormData({})
        setIsActive(false); 
        setEditData({})
    }
  return (
    <div className='event-form fixed'>
        <div className={`modal ${isActive ? 'active' : 'inactive'} `}>
            <header className='flex justify-between items-center'>
                <h1>Add new Event</h1>
                <AiOutlineClose className='cursor-pointer' onClick={onCloseHandler}/>
            </header>
            <form action="post" className='flex flex-col'>
                <Input onChange={e => setFormData({...formData, ['name']:e.target.value})} value={formData.name} type="text" placeholder="Enter Event Name"/>
                <Date placeholder="Event Date" onChange={(date) => setFormData({...formData, date})} value={formData?.date}/>
                <select className='select' onChange={e => setFormData({...formData, ['status']:e.target.value})} value={formData.status}>
                    <option>Select a Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                </select>
                {/* <Select placeholder="Select Status" /> */}
                <Button label="Create Event" onClicker={onClickHandler}/>
            </form>
        </div>
    </div>
  )
}

export default EventForm
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Button from '../Form/Button';
import Input from '../Form/Input';
import Date from '../Form/Date';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewEvent, GetUserEvents, UpdateEvent } from '@/redux/slices/eventsSlice';

const EventForm = ({ setIsActive, editData, setEditData }) => {
    
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        status: ''
    })
    const [isEdit, setIsEdit] = useState(false)

    const response = useSelector((state) => state?.settings?.response)
    const dispatch = useDispatch()

    useEffect(() => {
        if(editData && Object.keys(editData).length > 0){
            setIsEdit(true)
            setFormData(editData)
        } 
    },[editData])    
    console.log("formData",editData, formData, response);

    useEffect(() => {
        if(response && Object.keys(response).length > 0){
            if(response?._id !== undefined){
                setFormData({})
                setIsActive(false)
                dispatch(GetUserEvents())
            }
        }
    },[response])
    
    const onClickHandler = e => {
        e.preventDefault()
        dispatch(AddNewEvent(formData))
    }

    const clearData = () => {
        setFormData({})
        setEditData({})
    }
    const onUpdateHandler = e => {
        e.preventDefault()
        dispatch(UpdateEvent(formData))
        clearData()
    }

    const onCloseHandler = () => {
        clearData()
        setIsActive(false); 
    }
    
  return (
    <div className='modal'>
        <header className='flex justify-between items-center'>
            <h1>{isEdit ? 'Update' : 'Add new'} Event</h1>
            <AiOutlineClose className='cursor-pointer' onClick={onCloseHandler}/>
        </header>
        <form action="post" className='flex flex-col gap-2'>
            <Input onChange={e => setFormData({...formData, ['name']:e.target.value})} value={formData.name} type="text" placeholder="Enter Event Name"/>
            <Date placeholder="Event Date" onChange={(date) => setFormData({...formData, date})} value={formData?.date}/>
            <select className='select' onChange={e => setFormData({...formData, ['status']:e.target.value})} value={formData.status?.toLowerCase()}>
                <option>Select a Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                {
                    isEdit && <option value="cancelled">Cancel</option>
                }
            </select>
            {
                isEdit ?
                <Button label="Update Event" onClicker={onUpdateHandler}/> :
                <Button label="Create Event" onClicker={onClickHandler}/>

            }
        </form>
    </div>
  )
}

export default EventForm
import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Button from '../Form/Button';
import Input from '../Form/Input';
import Date from '../Form/Date';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewEvent, UpdateEvent } from '@/redux/slices/eventsSlice';

const EventForm = ({ setIsActive, editData, setEditData }) => {
    
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        description: '',
        status: 'active'
    })
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState({})
    const [isClicked, setIsClicked] = useState(false)

    const response = useSelector((state) => state?.settings?.response)
    const dispatch = useDispatch()

    useEffect(() => {
        if(editData && Object.keys(editData).length > 0){
            setIsEdit(true)
            setFormData(editData)
        } 
    },[editData])    

    useEffect(() => {
        if(response && Object.keys(response).length > 0){
            if(response?._id !== undefined){
                setFormData({})
                setIsActive(false)
            }
        }
    },[response])
    
    const onClickHandler = e => {
        if (isClicked) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        
        const trimmedFormData = {
            ...formData,
            name: formData.name.trim(),
            description: formData.description.trim(),
        };

        if (!trimmedFormData.date || !trimmedFormData.name) {
            let err = {};
            if (!trimmedFormData.date) {
                err.date = "Event Date Required";
            }
            if (!trimmedFormData.name) {
                err.name = "Event Name Required";
            }
            setError(err);
            return;
        } else {
            setIsClicked(true)
            dispatch(AddNewEvent(trimmedFormData))
        }
    }

    const clearData = () => {
        setFormData({})
        setEditData({})
    }
    const onUpdateHandler = e => {        
        if (isClicked) {
            e.preventDefault();
            return;
        }
        e.preventDefault();

        const trimmedFormData = {
            ...formData,
            name: formData.name.trim(),
            description: formData.description.trim(),
        };

        if (!trimmedFormData.date || !trimmedFormData.name) {
            let err = {};
            if (!trimmedFormData.date) {
                err.date = "Event Date Required";
            }
            if (!trimmedFormData.name) {
                err.name = "Event Name Required";
            }
            setError(err);
            return;
        } else {
            setIsClicked(true)
            dispatch(UpdateEvent(trimmedFormData))
            clearData()
        }
    }

    const onCloseHandler = () => {
        clearData()
        setIsActive(false); 
    }

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        if (formData[name] !== value) {
            setFormData({ ...formData, [name]: value });
            setError({...error, [name]: ''})
        }
    }, [formData]);
    
  return (
    <div className='modal'>
        <header className='flex justify-between items-center'>
            <h1>{isEdit ? 'Update' : 'Add new'} Event</h1>
            <AiOutlineClose className='cursor-pointer' onClick={onCloseHandler}/>
        </header>
        <form action="post" className='flex flex-col gap-4'>
            <Input error={error.name} onChange={handleInputChange} name='name' value={formData.name} type="text" placeholder="Enter Event Name"/>
            <Input onChange={handleInputChange} name='description' value={formData.description} type="text" placeholder="Enter Event Description"/>
            <Date error={error.date} placeholder="Event Date" onChange={(date) => {setFormData({...formData, date});setError({...error, ['date']: ''})}} value={formData?.date}/>
            <select className='select' onChange={e => setFormData({...formData, ['status']:e.target.value})} value={formData.status?.toLowerCase()}>
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
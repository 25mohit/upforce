"use client"
import React, { useEffect, useState } from 'react'
import Section from '../components/HOC/Section'
import Stats from '../components/Utils/Card/Stats'
import Input from '../components/Utils/Form/Input'
import Button from '../components/Utils/Form/Button'
import { MdOutlineEmojiEvents } from "react-icons/md";
import Table from '../components/Utils/Table'
import { FcFilledFilter } from "react-icons/fc";
import FilterMenu from '../components/Utils/FilterMenu'
import Filter from '../components/Utils/Filter'
import EventForm from '../components/Utils/Modal/EventForm'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserEvents } from '@/redux/slices/eventsSlice'
import { SignInUser } from '@/redux/slices/userSlice'
import { GetResponse } from '@/redux/slices/settingSlice'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [editData, setEditData] = useState({})

    const dispatch = useDispatch()
    const response = useSelector((state) => state?.events?.eventsList)
    
    useEffect(() => {
        console.log(SignInUser, GetUserEvents);
        
        dispatch(GetUserEvents())
    },[])

    useEffect(() => {
        if(response?.length){
            setData(response)
            dispatch(GetResponse({}))
        }
    },[response])

    const onClickHandler = () => {
        setIsActive(true)
    }
    console.log("response", response);
    
  return (
    <Section>
        <div className="stats-bar flex flex-wrap gap-4">
            <Stats type="active"/>
            <Stats type="pending"/>
            <Stats type="canceled"/>
            <Stats type="deleted"/>
        </div>
        <div className="controls-bar my-7 flex flex-wrap items-center justify-between gap-4">
            <div className='md:w-3/4 w-full flex gap-2 items-center relative'>
                <Input type="text" placeholder="Start typing event name to search..." />
                <Filter />
            </div>
            <div className="btns">
                <Button icon={<MdOutlineEmojiEvents />} label="Add New Event" onClicker={onClickHandler}/>
            </div>
        </div>
        <div className="tab-container">
            <Table data={data} setIsActive={setIsActive} setEditData={setEditData}/>
        </div>
        { isActive && <EventForm editData={editData} setIsActive={setIsActive} setEditData={setEditData}/>}
    </Section>
  )
}

export default Dashboard
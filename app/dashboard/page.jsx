'use client'
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
import { GetFilteredEvents } from '@/redux/slices/eventsSlice'
import { SignInUser } from '@/redux/slices/userSlice'
import { GetResponse } from '@/redux/slices/settingSlice'
import AuthWrapper from '../components/HOC/AuthWrapper'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [editData, setEditData] = useState({})
    const [filterParam, setFilterParam] = useState({sort: 'name'})
    const [isCalling, setIsCalling] = useState(null)

    const dispatch = useDispatch()
    const response = useSelector((state) => state?.events?.eventsList)
    
    useEffect(() => {
        dispatch(GetFilteredEvents(filterParam))
        // dispatch(GetUserEvents())
    },[])

    useEffect(() => {
        if(response?.length || Object.keys(response)?.length > 0){
            // alert("Hello")
            setData(response)
            // dispatch(GetResponse({}))
        }
    },[response])

    const onClickHandler = () => {
        setIsActive(true)
    }

    console.log("response", response);
    
    // useEffect(() => {
    //     if(filterParam.key === 'search'){

    //         if(!isSearching){
    //             isSearching = true
    //             console.log('API Calling');
    //             setTimeout(() => {
    //                 isSearching = false
    //             },2000)
    //         }
    //     }
    // },[filterParam])

    const deboucedSearch = () => {
        console.log("API Calling")
        dispatch(GetFilteredEvents(filterParam))
    }

    const onSearchChange = e => {
        setFilterParam({search:e.target.value})

        if(isCalling){
            clearTimeout(isCalling)
        }

        const timeOut = setTimeout(() => {
            deboucedSearch()
        },1000)

        setIsCalling(timeOut)
    }
    
  return (
    <AuthWrapper>
        <Section>
            <div className="stats-bar flex flex-wrap gap-4">
                <Stats type="active" count={response?.stats?.active}/>
                <Stats type="pending" count={response?.stats?.pending}/>
                <Stats type="canceled" count={response?.stats?.cancelled}/>
            </div>
            <div className="controls-bar my-7 flex flex-wrap items-center justify-between gap-4">
                <div className='md:w-1/2 w-full flex gap-2 items-center relative'>
                    <Input value={filterParam.value} onChange={onSearchChange} type="text" placeholder="Start typing event name to search..." />
                    <Filter />
                </div>
                <div className="btns">
                    <Button icon={<MdOutlineEmojiEvents />} label="Add New Event" onClicker={onClickHandler}/>
                </div>
            </div>
            <div className="tab-container">
                <Table data={data?.filteredData?.events} setIsActive={setIsActive} setEditData={setEditData}/>
            </div>
            { isActive && <EventForm editData={editData} setIsActive={setIsActive} setEditData={setEditData}/>}
        </Section>
    </AuthWrapper>
  )
}

export default Dashboard
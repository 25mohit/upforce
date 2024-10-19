'use client'
import React, { useEffect, useState } from 'react'
import SectionWrapper from '../components/HOC/Section'
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
import dynamic from 'next/dynamic'
import Pagination from '../components/Utils/Pagination'

const NoSSR = dynamic(() => import('../components/HOC/AuthWrapper'), {ssr: false})

const Dashboard = () => {
    const [data, setData] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [editData, setEditData] = useState({})
    const [filterParam, setFilterParam] = useState({sort: 'createdAt'})
    const [isCalling, setIsCalling] = useState(null)

    const dispatch = useDispatch()
    const response = useSelector((state) => state?.events?.eventsList)
    
    useEffect(() => {
        dispatch(GetFilteredEvents(filterParam))
    },[])

    useEffect(() => {
        if(response?.length || Object.keys(response)?.length > 0){
            setData(response)
        }
    },[response])

    const onSearchChange = e => {
        const value = e.target.value
        setFilterParam({search:value})

        if(!value?.length) return dispatch(GetFilteredEvents({sort: 'createdAt'}))
        
        if(isCalling){
            clearTimeout(isCalling)
        }
        
        const timeOut = setTimeout(() => {
            dispatch(GetFilteredEvents({search: value}))
        },1000)

        setIsCalling(timeOut)
    }
    const handlePageChange = (page) => {
        // setCurrentPage(page);
        dispatch(GetFilteredEvents({page}));
      };
  return (
    <NoSSR>
        <SectionWrapper>
            <div className="stats-bar flex flex-wrap gap-4">
                <Stats type="active" count={response?.stats?.active}/>
                <Stats type="pending" count={response?.stats?.pending}/>
                <Stats type="canceled" count={response?.stats?.cancelled}/>
            </div>
            <div className="controls-bar my-7 flex flex-wrap items-center justify-between gap-4">
                <div className='md:w-1/2 w-full flex gap-2 items-center relative'>
                    <Input value={filterParam.search} onChange={onSearchChange} type="text" placeholder="Start typing event name to search..." />
                    <Filter />
                </div>
                <div className="cntrns flex items-center gap-4">
                    <Pagination currentPage={response?.filteredData?.page} pageSize={10} totalRecords={response?.filteredData?.totalDocuments} onPageChange={handlePageChange}/>
                    <Button icon={<MdOutlineEmojiEvents />} label="Add New Event" onClicker={() => setIsActive(true)}/>
                </div>
            </div>
            <div className="tab-container">
                <Table data={data?.filteredData} setIsActive={setIsActive} setEditData={setEditData}/>
            </div>
            { isActive && <EventForm editData={editData} setIsActive={setIsActive} setEditData={setEditData}/>}
        </SectionWrapper>
    </NoSSR>
  )
}

export default Dashboard
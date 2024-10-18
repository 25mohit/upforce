import React from 'react'
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
import AddNewEvent from '../components/Utils/AddNewEvent'

const Dashboard = () => {
    
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
                <AddNewEvent />
            </div>
        </div>
        <div className="tab-container">
            <Table />
        </div>
        
    </Section>
  )
}

export default Dashboard
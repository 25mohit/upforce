'use client'
import React, { useState } from 'react'
import Button from './Form/Button'
import { MdOutlineEmojiEvents } from 'react-icons/md'
import EventForm from './Modal/EventForm'

const AddNewEvent = () => {
    const [isActive, setIsActive] = useState(false)
    const onClickHandler = () => {
        setIsActive(true)
    }

  return (
    <>
        <Button icon={<MdOutlineEmojiEvents />} label="Add New Event" onClicker={onClickHandler}/>
        <EventForm isActive={isActive} setIsActive={setIsActive}/>
    </>
  )
}

export default AddNewEvent
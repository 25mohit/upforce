import { GetFilteredEvents } from '@/redux/slices/eventsSlice';
import React from 'react'
import { useDispatch } from 'react-redux';

const FilterMenu = ({ setIsShow }) => {

  const dispatch = useDispatch()

  const onChangeHandler = e => {
    dispatch(GetFilteredEvents({sort: e.target.value}))
    setTimeout(() => {
      setIsShow(false)
    },100)
  }
  return (
    <div className='filter-menu absolute'>
        <ul className='flex flex-col gap-1'>
            <li><input type="radio" value="name" onChange={onChangeHandler} name='filter' id="name"/><label htmlFor="name">Name</label></li>
            <li><input type="radio" value="createdAt" onChange={onChangeHandler} name='filter' id="createdAt"/><label htmlFor="createdAt">Created at</label></li>
            <li><input type="radio" value="status" onChange={onChangeHandler} name='filter' id="status"/><label htmlFor="status">Status</label></li>
        </ul>
    </div>
  )
}

export default FilterMenu
import React from 'react'

const FilterMenu = () => {
  return (
    <div className='filter-menu absolute'>
        <ul className='flex flex-col gap-1'>
            <li><input type="checkbox" id="name"/><label htmlFor="name">Name</label></li>
            <li><input type="checkbox" id="createdAt"/><label htmlFor="createdAt">Created at</label></li>
            <li><input type="checkbox" id="status"/><label htmlFor="status">Status</label></li>
        </ul>
    </div>
  )
}

export default FilterMenu
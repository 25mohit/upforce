import React from 'react'

const Stats = ({ type }) => {
  return (
    <div className={`stats ${type} cursor-pointer border w-fit rounded-lg p-2 px-3 hover:scale-110 text-center`}>
        <h3 className='text-lg font-bold capitalize'>{type} Events</h3>
        <i>10</i>
    </div>
  )
}

export default Stats
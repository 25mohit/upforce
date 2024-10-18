import React from 'react'

const Button = ({ label, icon }) => {
  return (
    <button className='button w-fit'>{icon}{label}</button>
  )
}

export default Button
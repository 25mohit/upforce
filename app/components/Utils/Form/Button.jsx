import React from 'react'

const Button = ({ label, icon }) => {
  return (
    <button className='button'>{icon}{label}</button>
  )
}

export default Button
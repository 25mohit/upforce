import React from 'react'

const Button = ({ label, icon, onClicker }) => {
  return (
    <button className='button w-fit' onClick={onClicker}>{icon}{label}</button>
  )
}

export default Button
import React from 'react'

const Button = ({ label, icon, onClicker, type }) => {
  return (
    <button className={`button w-fit ${type}`} onClick={onClicker}>{icon}{label}</button>
  )
}

export default Button
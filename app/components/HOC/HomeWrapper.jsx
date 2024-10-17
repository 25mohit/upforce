import React from 'react'

const HomeWrapper = props => {
  return (
    <section className='home-wrapper flex flex-wrap'>{props.children}</section>
  )
}

export default HomeWrapper
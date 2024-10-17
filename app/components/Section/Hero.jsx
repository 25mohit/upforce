import React from 'react'

const Hero = () => {
  return (
    <>
      <div className='w-full md:w-1/2 mb-4 md:mb-0 flex gap-4 justify-center flex-col'>
        <div className="heading">
          <h1 className='text-4xl'>Welcome to</h1>
          <h2 className='text-2xl'>Event Management</h2>
        </div>
        <p>From Concept to Celebration – We Make Every Moment Unforgettable</p>
        <p>Whether it's a corporate event, wedding, or special occasion, we bring your vision to life with flawless execution and attention to detail. Let us handle the planning, so you can enjoy the memories.</p>
        <i>Expert planning. Stunning designs. Seamless experiences.</i>
      </div>
      <div className='w-full md:w-1/2 flex gap-4 justify-center flex-col'>Hero</div>
    </>
  )
}

export default Hero
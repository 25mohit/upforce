import React, { useState } from 'react'
import FilterMenu from './FilterMenu'
import { FcFilledFilter } from 'react-icons/fc'

const Filter = () => {
    const [isShow, setIsShow] = useState(false)

  return (
    <>
        <FcFilledFilter id="filter-icon" onClick={() => setIsShow(!isShow)} title="Filter Events"/>
        { isShow && <FilterMenu setIsShow={setIsShow}/> }
    </>
  )
}

export default Filter
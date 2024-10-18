import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Button from '../Form/Button'
import { FaCheck } from "react-icons/fa6";
import { MdOutlineBackHand } from "react-icons/md";

const DeleteModal = ({ data, setData }) => {

    const onDeleteHandler = () => {
        alert('asd')
    }
  return (
    <div className='modal'>
        <header className='flex justify-between items-center'>
            <h1>Delete </h1>
            <AiOutlineClose className='cursor-pointer'  onClick={() => setData({})}/>
        </header>
        <section>
            <h1 className='text-gray-50 mb-4'>Are you really want to delete <i><b>'{data?.name}'</b></i> ?</h1>
            <footer className='flex gap-3'>
                <Button icon={<FaCheck />} type="danger" label="Yes" onClicker={onDeleteHandler}/>
                <Button icon={<MdOutlineBackHand />} label="No" onClicker={() => setData({})}/>
            </footer>
        </section>
    </div>
  )
}

export default DeleteModal
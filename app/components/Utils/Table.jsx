import moment from 'moment';
import React, { useState } from 'react'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DeleteModal from './Modal/DeleteModal';

const Table = ({ data, setIsActive, setEditData }) => {

    const [deleteData, setDeleteData] = useState({})
    
    const onEditHandler = (rowData) => {
        setIsActive(true)
        setEditData(rowData)
    }

  return (
    <div className='table rounded-md'>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th className='text-left'>Event Name</th>
                    <th className='text-left'>Description</th>
                    <th>Created At</th>
                    <th>Event At</th>
                    <th>Status</th>
                    <th>Control</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.events?.map((event, index) => {
                        const displayIndex = (Number(data?.page) - 1) * 10 + index + 1;                        
                        return (<tr key={event?._id}>
                            <td>{displayIndex}</td>
                            <td className='tx-left'>{event.name}</td>
                            <td className='tx-left'>{event.description}</td>
                            <td className='whitespace-nowrap'>{moment(event.createdAt).startOf('minutes').fromNow()}</td>
                            <td className='whitespace-nowrap'>{moment(event.date).format("MMM Do YYYY")}</td>
                            <td><span className={`chip capitalize ${event.status?.toLowerCase()}`}>{event.status}</span></td>
                            <td>
                                <FaEdit title="Edit Event" id="icon" onClick={() => onEditHandler(event)}/> 
                                <FaTrashAlt title="Delete Event" id="icon" onClick={() => setDeleteData(event)}/></td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
        {!data?.events?.length && <p className='text-center py-4'>No Events to Display !</p>}
        {Object.keys(deleteData)?.length > 0 && <DeleteModal data={deleteData} setData={setDeleteData}/> }
    </div>
  )
}

export default Table
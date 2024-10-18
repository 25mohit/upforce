import moment from 'moment';
import React from 'react'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { LuAlarmClockOff } from "react-icons/lu";

const Table = ({ data, setIsActive, setEditData }) => {
    console.log("data", data);
    
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
                    <th>Created At</th>
                    <th>Event At</th>
                    <th>Status</th>
                    <th>Control</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((event, index) => 
                    <tr key={event?._id}>
                        <td>{index+1}</td>
                        <td>{event.name}</td>
                        <td>{moment(event.createdAt).startOf('minutes').fromNow()}</td>
                        <td>{moment(event.date).startOf('minutes').fromNow()}</td>
                        <td><span className={`chip capitalize ${event.status?.toLowerCase()}`}>{event.status}</span></td>
                        <td>
                            <LuAlarmClockOff title="Cancel Event" id="icon"/> 
                            <FaEdit title="Edit Event" id="icon" onClick={() => onEditHandler(event)}/> 
                            <FaTrashAlt title="Delete Event" id="icon"/></td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table
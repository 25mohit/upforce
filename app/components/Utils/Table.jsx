import React from 'react'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { LuAlarmClockOff } from "react-icons/lu";

const Table = ({ data }) => {
    console.log("data", data);
    
  return (
    <div className='table rounded-md'>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th className='text-left'>Event Name</th>
                    <th>Created At</th>
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
                        <td>{event.createdAt}</td>
                        <td><span className={`chip ${event.status?.toLowerCase()}`}>{event.status}</span></td>
                        <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table
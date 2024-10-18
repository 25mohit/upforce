import React from 'react'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { LuAlarmClockOff } from "react-icons/lu";

const Table = () => {
  return (
    <div className='table rounded-md'>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Event Name</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Control</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Movie Night</td>
                    <td>02-July-1995</td>
                    <td><span className="chip active">Active</span></td>
                    <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Movie Night</td>
                    <td>02-July-1995</td>
                    <td><span className="chip">Active</span></td>
                    <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Movie Night</td>
                    <td>02-July-1995</td>
                    <td><span className="chip">Active</span></td>
                    <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Movie Night</td>
                    <td>02-July-1995</td>
                    <td><span className="chip">Active</span></td>
                    <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Movie Night</td>
                    <td>02-July-1995</td>
                    <td><span className="chip">Active</span></td>
                    <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Movie Night</td>
                    <td>02-July-1995</td>
                    <td><span className="chip">Active</span></td>
                    <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Movie Night</td>
                    <td>02-July-1995</td>
                    <td><span className="chip">Active</span></td>
                    <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Movie Night</td>
                    <td>02-July-1995</td>
                    <td><span className="chip">Active</span></td>
                    <td><LuAlarmClockOff title="Cancel Event" id="icon"/> <FaEdit title="Edit Event" id="icon"/> <FaTrashAlt title="Delete Event" id="icon"/></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Table
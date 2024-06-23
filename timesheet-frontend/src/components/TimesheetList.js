import React, { useState, useEffect } from 'react';
import { getTimesheets } from '../api';
import { CSVLink } from 'react-csv';


const TimesheetList = () => {
    const [timesheets, setTimesheets] = useState([]);

    useEffect(() => {
        getTimesheets().then(response => {
            setTimesheets(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Timesheet List</h1>
            <CSVLink data={timesheets} filename={"timesheets.csv"}>
                Export CSV
            </CSVLink>
            <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Date</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheets.map((timesheet, index) => (
                        <tr key={index}>
                            <td>{timesheet.Project.name}</td>
                            <td>{timesheet.date}</td>
                            <td>{timesheet.hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimesheetList;

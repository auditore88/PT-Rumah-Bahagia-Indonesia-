import React from 'react';
import TimesheetForm from '../components/TimesheetForm';
import TimesheetList from '../components/TimesheetList';

const Timesheets = () => {
    return (
        <div>
            <h1>Timesheets</h1>
            <TimesheetForm />
            <TimesheetList />
        </div>
    );
};

export default Timesheets;

import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';


export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div className='my_calendar'>
      <h1>Calendar</h1>
      <Calendar 
      onChange={onChange} value={value}
      />
    </div>
  );
}
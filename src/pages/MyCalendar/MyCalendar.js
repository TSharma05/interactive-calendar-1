import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';
import Papa from 'papaparse';



export default function MyCalendar(props) {
  const [value, onChange] = useState(new Date());

  // state to store the parsed csv data
  const [csvData, setCsvData] = useState([]);
    
  // method to view file contents via the onChange event
  const changeHandler = (e) => {
      console.log(e.target.files[0]);
      // pass file data to PapaParse to parse the data
      Papa.parse(e.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
              console.log(results.data);
              setCsvData(results.data);
          },
      });
  };
  

  return (
    <div className='my_calendar'>
      <h1>Calendar</h1>
      {/* file upload button */}
      <input 
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
                style={{display: "block", margin: "10px auto"}}
            />
      <Calendar 
      onChange={onChange} value={value}
      />
    </div>
  );
}
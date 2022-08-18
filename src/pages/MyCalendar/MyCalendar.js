import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';
import Papa from 'papaparse';



export default function MyCalendar(props) {
  // sets the calendar to show March 2022 because csv file is for March 2022
  // remove the code in Date() to show current month
  const [value, onChange] = useState(new Date(2022, 3, 0));

  var moment = require('moment');

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
              // console.log(results.data);
              setCsvData(results.data);
          },
      });
  };

  // function to pull individual data from csv data
  const getData = csvData.map((item) => {
    // change date to remove time
    const date = item["Date & Time"].split(" ")[0];

    // for similar dates, add the usage and generation data together
    if (csvData.filter((item) => { return item["Date & Time"].split(" ")[0] === date;
    }))
    {
      const usage = csvData.filter((item) => { return item["Date & Time"].split(" ")[0] === date;
      }).map((item) => { return parseFloat(item["Usage [kW]"]);
      }).reduce((a, b) => { return a + b;
      }).toFixed(1);
      const generation = csvData.filter((item) => { return item["Date & Time"].split(" ")[0] === date;
      }).map((item) => { return parseFloat(item["Generation [kW]"]);
      }).reduce((a, b) => { return a + b;
      }).toFixed(1);
      return {date: date, usage: usage, generation: generation};
      
    }
    else {
      return "No data for this date";
    }
  })

  // clean up data so it's not repeating
  const cleanData = getData.filter((item, index) => {
    const _value = JSON.stringify(item);
    return index === getData.findIndex((obj) => { return JSON.stringify(obj) === _value;
  })});

  function tileClassName() {
        cleanData.map((item) => {
          console.log(item.generation)
          if (item.generation >= 1 && item.generation <=10) {
            console.log("very low");
            return 'very-low'
          }
          else if (item.generation >= 11 && item.generation <=20) {
            console.log('low');
            return 'low'
          }
          else if (item.generation >= 21 && item.generation <=30) {
            console.log('medium');
            return 'medium'
          }
          else if (item.generation >= 31 && item.generation <=40) {
            console.log('med-2');
            return 'med-2'
          }
          else if (item.generation >= 41) {
            console.log('high');
            return 'high'
          }
          else {
            console.log('no data');
            return 'no-data'
          }
        }
        )
  }

  console.log(cleanData);
  console.log(cleanData[0]);

  const renderCalendar = () => {
    if (csvData.length > 0) {
      return (
        <div className="calendar">
          <Calendar 
            onChange={onChange} value={value}
            // tileContent={tileContent}
            tileClassName={tileClassName}
        />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Please upload a csv file</h1>
        </div>
      )
    }
  }
  

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
      {renderCalendar()}
      
    </div>
  );
}
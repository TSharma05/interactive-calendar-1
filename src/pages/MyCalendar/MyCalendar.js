import React, {useCallback, useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';
import Papa from 'papaparse';
import dayjs from 'dayjs';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './Heatmap.css'



export default function MyCalendar() {
  // sets the calendar to show March 2022 because csv file is for March 2022
  // remove the code in Date() to show current month
  const [value, onChange] = useState(new Date(2022, 3, 0));

  const [tileName, setTileName] = useState('');
  
  

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

  var moment = require('moment');

  // function to pull individual data from csv data
  const getData = csvData.map((item) => {
    // change date to remove time
    const date = item["Date & Time"].split(" ")[0];
    // change format of date
    const newDate = moment(date, "YYYY-MM-DD").format("MM-DD-YYYY");
    // pull just day from date
    const day = parseInt(newDate.split("-")[1]);

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
      return {newDate: newDate, usage: usage, generation: generation, day: day};
      
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

  const revData = cleanData.reverse();

  // add count for heatmap
  revData.forEach(object => {
    if (object.generation >= 1 && object.generation <= 10) {
      object.count = 1;
    } 
    else if (object.generation >= 11 && object.generation <= 20) {
      object.count = 2;
    }
    else if (object.generation >= 21 && object.generation <= 30) {
      object.count = 3;
    }
    else if (object.generation >= 31 && object.generation <= 40) {
      object.count = 4;
    }
    else if (object.generation >= 40.1) {
      object.count = 5;
    }
    else {
      object.count = 0;
    }
  })

  


  function getHighlight(param) {
    if (param === 1) {
      console.log("this is 1");
      return "very-low";
    }
    else if (param === 2) {
      console.log("this is 2");
      return "low";
    }
    else if (param === 3) {
      console.log("this is 3");
      return "medium";
    }
    else if (param === 4) {
      console.log("this is 4");
      return "med-2";
    }
    else if (param === 5) {
      console.log("this is 5");
      return "high";
    }
    else {
      console.log("this is 0");
      return "no-data";
    }
  }

  const tileClassName = useCallback(() => {
    // console.log(revData[0].count)
    setTileName(getHighlight(revData[0].count));
  //   if ( 
  //     revData.count === 1){
  //       console.log("this is 1");
  //       setTileName("very-low");
  //     } 
  //     else if (
  //     revData.count === 2){
  //       console.log("this is 2");
  //       setTileName("low");
  //     }
  //     else if (
  //     revData.count === 3){
  //       console.log("this is 3");
  //       setTileName("medium");
  //     }
  //     else if (
  //     revData.count === 4){
  //       console.log("this is 4");
  //       setTileName("med-2");
  //     }
  //     else if (
  //     revData.count === 5){
  //       console.log("this is 5");
  //       setTileName("high");
  //     }
  //     else {
  //       console.log("this is 0");
  //       setTileName("no-data");
  //     }
  // }
  }, [tileName]);
  
  // function getClassName() {
  //     if ( 
  //   revData.find((item) => item.count === 1)){
  //     console.log("this is 1");
  //     return "very-low";
  //   } 
  //   else if (
  //   revData.find((item) => item.count === 2)){
  //     console.log("this is 2");
  //     return "low";
  //   }
  //   else if (
  //   revData.find((item) => item.count === 3)){
  //     console.log("this is 3");
  //     return "medium";
  //   }
  //   else if (
  //   revData.find((item) => item.count === 4)){
  //     console.log("this is 4");
  //     return "med-2";
  //   }
  //   else if (
  //   revData.find((item) => item.count === 5)){
  //     console.log("this is 5");
  //     return "high";
  //   }
  //   else {
  //     console.log("this is 0");
  //     return "no-data";
  //   }
   
    
  // }
  

  

  console.log(revData);
  

  const renderCalendar = () => {
    if (csvData.length > 0) {
      return (
        <div>
          <div className="calendar">
            <Calendar 
              onChange={onChange} value={value}
              // tileContent={tileContent}
              // tileClassName={({ date, view}) => {
              //   if(view === "month"){
              //     revData.forEach(item => {
              //       if (item.day === date.getDate()) {
              //         console.log(item.count)
              //         return getHighlight(item.count);
              //       }
              //     })
              //   } else {
              //     console.log("didn't work")
              //   }
              // }}
              
              tileClassName={tileClassName}

              
              showNeighboringMonth={false}
            />
          </div>
          
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
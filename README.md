# Interactive Energy Usage Calendar #

**Generate Calendar**
I used the React-Calendar for this project. Install the library by executing `npm install react-calendar`

- Add a pages folder to the the src folder
- Add a MyCalendar folder inside the pages folder
- Add MyCalendar.js and MyCalendar.css inside the MyCalendar folder
- Import MyCalendar to App.js
- Removed the pre-loaded code but kept the <div> section. Added MyCalendar to app function so that the calendar will be displayed
- In MyCalendar.js:
    - import Calendar from react-calendar
    - set a state variable that allows for toggling between months


**Custom Styling For The Calendar**
To customize the calendar I needed to import the react-calendar styles to MyCalendar.js using `import 'react-calendar/dist/Calendar.css'`

- Go to `'node_modules/react-calendar/dist` and copy the code from `Calendar.css`.  
- Paste the code in the MyCalendar.css file.
- Include `import './MyCalendar.css'` at top of MyCalendar.js.
- Delete `import 'react-calendar/dist/Calendar.css'` from MyCalendar.js.


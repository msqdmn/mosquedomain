import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker styles
import './Calendar.css'; 
import { Button, TextField } from '@mui/material';
import { PostPayment } from '../components/auth';

function Postpayment() {

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [Email, setEmail] = useState("");

    // Handle the input change
    const handleChange = (event) => {
      setEmail(event.target.value); // Update state with the input value
    }
    const handlesubmit = async () => {
      try {
        
        await PostPayment({Email:Email,Date:dateRange})
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
      <h2>Enter Email:</h2>
         <TextField
        label="Enter Email"   // MUI TextField label
        variant="outlined"   // Outlined style for the input
        value={Email}   // Bind the input value to the state
        onChange={handleChange} // Handle input changes
                // Make the input take full width
      />
              <h2>Select a date range:</h2>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update); // Set the date range from the date picker
        }}
        isClearable={true}
        placeholderText="Select a date range"
      />
        {console.log(Email,startDate,endDate)}
        <Button variant="contained" color="primary"  onClick={handlesubmit}>
                    Submit
                </Button>
    </div>
  )
}

export default Postpayment
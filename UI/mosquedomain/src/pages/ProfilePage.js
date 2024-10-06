import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import './Calendar.css'; // Import the custom CSS file
import { collection, getDocs,query ,where} from '@firebase/firestore';
import { db } from '../config/firebase';

export default function Calendar(props) {
  // Example date range you want to fill with green
  const startDate = new Date('2024-10-04');
  const endDate = new Date('2024-10-10');
  const [transactions, setTransactions] = useState([]);
  const [dateRanges, setdateRanges] = useState([]);
  const [payment, setpayment] = useState([]);
//   const dateRanges = [
//     { start: new Date('2024-10-04'), end: new Date('2024-10-10') },
//     { start: new Date('2024-10-15'), end: new Date('2024-10-20') },
//     { start: new Date('2024-10-25'), end: new Date('2024-10-30') },
//   ];
const Email = props.Email
console.log("EMAIL PROP :" ,Email)

  useEffect(() => {  
    const getTransactionsList = async () => {
        try {
            const transactionCollectionRef = collection(db,"transactions");
            const paymentRef = collection(db,"payment")
            const q = query(paymentRef,where('Email','==',Email))
            const transactiondata = await getDocs(transactionCollectionRef);
            const paymentdata = await getDocs(q);
            const transactionfilteredData = transactiondata.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const paymentfilteredData = paymentdata.docs.map((doc) => ({  id: doc.id,dateR:doc.get('Date') }));
            const dateRanges = paymentfilteredData.map(item => ({start:new Date(item.dateR[0].seconds*1000),end:new Date(item.dateR[1].seconds*1000)}))
            console.log(transactionfilteredData)
            console.log(dateRanges)
            setdateRanges(dateRanges)
            // setTransactions(filteredData);
        } catch (error) {
            console.error(error);
        }
    };
    getTransactionsList();
}, []);

  // Helper function to check if a date is within the range
  const isDateInAnyRange = (date) => {
    return dateRanges.some(range => date >= range.start && date <= range.end);
  };

  // Callback function to assign CSS class to specific cells
  const handleDayCellClassNames = (arg) => {
    if (isDateInAnyRange(arg.date)) {
      return ['green-cell']; // Assign custom class if the date is in range
    }
    return [];
  };

  return (
    <>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      dayCellClassNames={handleDayCellClassNames} // Apply class based on date
      />
      </>
  );
}

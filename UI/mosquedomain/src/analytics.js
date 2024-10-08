import React from 'react'
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { db } from './config/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom'; // For navigation


const Analytics = () => {

    const drawerWidth = 240;
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const handlePOST = () => {
        navigate('/posttransaction');

    }
    const handlePAYMENT = () =>{
        navigate('/postpayment')
    }

    const HandleRowClick = (params) => {
        // navigate('')
        const emailww = params.row.Email; // Assuming email is in your row data
        console.log(emailww)
        navigate('/userdetails', { state: { Email: emailww } }); // Navigate and pass email as state

    }
    
    useEffect(() => {  
        const getTransactionsList = async () => {
            try {
                const transactionCollectionRef = collection(db, "transactions");
                const data = await getDocs(transactionCollectionRef);
                const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setTransactions(filteredData);
            } catch (error) {
                console.error(error);
            }
        };
        getTransactionsList();
    }, []);

    // Only generate columns if transactions data exists
    const columns = transactions.length > 0 ? Object.keys(transactions[0]).map(key => ({
        field: key,
        headerName: key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        flex: 1
    })) : [];
  return (<>
    <Typography >Analytics</Typography>
    <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: `${drawerWidth}px`,
                    marginTop: '64px', // Offset for AppBar height
                }}
                >
              
             
             
                
                {transactions.length > 0 ? (
                    <Box sx={{height:400}}> 
                {console.log(transactions.Email)}
                    <DataGrid
                        rows={transactions}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onRowClick={HandleRowClick}
                        />
                        </Box>
                ) : (
                    <Typography>Loading transactions...</Typography>
                    )}
                <Button variant="contained" color="primary"  onClick={handlePOST}>
                    ADD USER
                </Button>
                <Button variant="contained" color="primary"  onClick={handlePAYMENT}>
                    ADD PAYMENT
                </Button>
    </Box>
                    </>
  )
}

export default Analytics
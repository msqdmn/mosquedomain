import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { PostTransaction } from './components/auth';

const PostTransactionPage = () => {
  // State to store transaction details
  const [transaction, setTransaction] = useState({
    Address: '',
    "ID Number": '',
    "Mobile Number": '',
    Name: '',
    Email:""
  });

  // State to manage the response or errors
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(false);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the transactionData object
    const transactionData = {
      Address: transaction.Address,
      "ID Number": transaction["ID Number"],
      "Mobile Number": transaction["Mobile Number"],
      Name: transaction.Name,
      Email: transaction.Email
    };
    console.log(transactionData)
    try {
      // Replace with your API endpoint
    const responce = await PostTransaction(transactionData)
    
    //   if (response.ok) {
    //     setResponseMessage('Transaction successfully posted!');
    //     setError(false);
    //   } else {
    //     setResponseMessage('Failed to post transaction');
    //     setError(true);
    //   }
    } catch (error) {
      console.error('Error posting transaction:', error);
      setResponseMessage('An error occurred');
      setError(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Post a Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Address"
          name="Address"
          value={transaction.Address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="ID Number"
          name="ID Number"
          value={transaction["ID Number"]}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Mobile Number"
          name="Mobile Number"
          value={transaction["Mobile Number"]}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Name"
          name="Name"
          value={transaction.Name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="Email"
          value={transaction.Email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Submit 
        </Button>
      </form>

      {/* Display response message */}
      {responseMessage && (
        <Alert severity={error ? 'error' : 'success'} sx={{ mt: 2 }}>
          {responseMessage}
        </Alert>
      )}
    </Box>
  );
};

export default PostTransactionPage;

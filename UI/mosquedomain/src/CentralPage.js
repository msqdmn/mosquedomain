import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { Signout } from './components/auth';
import { useNavigate } from 'react-router-dom'; // For navigation
import { db } from './config/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { DataGrid } from '@mui/x-data-grid';
import { AuthStatus } from './components/auth';

const drawerWidth = 240;

function CentralPage() {

    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // State to store the user role
    
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

    const handleSignout = async () => {
        await Signout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Navigation Bar */}
            {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Central Page
                    </Typography>
                </Toolbar>
            </AppBar> */}

            {/* Sidebar */}
            {/* <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {[
                        { text: 'Home', path: '/' },
                        { text: 'Profile', path: '/profile' },
                        { text: 'Analytics', path: '/analytics' }
                    ].map(({ text, path }) => (
                        <ListItem button key={text} onClick={() => handleNavigation(path)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer> */}
            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: `${drawerWidth}px`,
                    marginTop: '64px', // Offset for AppBar height
                }}
            >
                <Toolbar />
                <Typography variant="h4">Welcome to the Central Page!</Typography>
                <Button onClick={handleSignout}>
                    Sign Out
                </Button>
                <AuthStatus/>
                
                {/* {transactions.length > 0 ? (
                    <Box sx={{height:400}}> 

                    <DataGrid
                        rows={transactions}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        />
                        </Box>
                ) : (
                    <Typography>Loading transactions...</Typography>
                )} */}
            </Box>
        </Box>
    );
}

export default CentralPage;

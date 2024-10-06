import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import CentralPage from './CentralPage';
import Unauthorized from './unauthorized';
import Analytics from './analytics';
import { ProtectedRoutes, Signout } from './components/auth';
import PostTransactionPage from './PostTransactionPage';
import ProfilePage from './pages/ProfilePage';
import Postpayment from './pages/Postpayment';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, } from '@firebase/auth';
import {createOrGetUserRole} from './components/auth'
import { auth } from './config/firebase';
import { Container } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';


function App() {

  const [user, setUser] = useState({email:""});
  const [role, setRole] = useState(null); // State to store the user role
  const navigate = useNavigate();
  const location = useLocation(); // To track current route
  const showHeaderAndSidebar = location.pathname !== '/' ;

  function ProfilePageWrapper() {
    const location = useLocation();
    const { Email } = location.state; // Get the email from the state
    return <ProfilePage Email={Email} />;
  }
  
  const handleSignout = async () => {
    await Signout();
    navigate('/login');
  };
 
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('User is signed in:', user);
          setUser(user);
          const userRole = await createOrGetUserRole(user);
          
          setRole(userRole);
        } else {
          console.log('No user is signed in');
          setUser("");
          setRole(null);
        }
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);
  
  
  return (
    <>
          {showHeaderAndSidebar && (
        <>
          <Header toggleSidebar={toggleSidebar} user={user.email} onSignOut={handleSignout}/>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
        </>
      )}
    
    
    {/* <Container maxWidth ="xxl" sx={{mt: 2,mb: 2}}> */}

    {/* <Router> */}
      <Routes>
        <Route element={<ProtectedRoutes/>}>
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/posttransaction" element={<PostTransactionPage/>} />
        <Route path="/postpayment" element={<Postpayment/>} />

        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/central" element={<CentralPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/profile" element={<ProfilePage Email={user.email}/>} />
        <Route path="/userdetails" element={<ProfilePageWrapper/>} />
        
        
      </Routes>
    {/* </Router> */}
    {/* </Container> */}
    </>
  );
}

export default App;


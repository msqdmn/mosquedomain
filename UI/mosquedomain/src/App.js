import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import CentralPage from './CentralPage';
import Unauthorized from './unauthorized';
import Analytics from './analytics';
import { ProtectedRoutes } from './components/auth';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
        <Route path="/analytics" element={<Analytics/>} />

        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/central" element={<CentralPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;


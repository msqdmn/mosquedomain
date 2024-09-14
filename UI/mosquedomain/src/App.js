import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import CentralPage from './CentralPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/central" element={<CentralPage />} />
      </Routes>
    </Router>
  );
}

export default App;

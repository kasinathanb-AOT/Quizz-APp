import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Auth from "./pages/auth/Auth";
import UserIndex from './pages/userIndex/UserIndex';
import { useEffect, useState } from 'react';

function RedirectToUser() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const parsedData = JSON.parse(userData);
      
      if (parsedData.length > 0) {
        const user = parsedData[0]; // or find the specific user if needed
        navigate(`/index/${user.username}`);
      }
    }
  }, [navigate]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/index/:username' element={<UserIndex />} />
        <Route path='/redirect' element={<RedirectToUser />} />
      </Routes>
    </Router>
  );
}

export default App;

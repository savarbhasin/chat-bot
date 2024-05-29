import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import Login from './pages/Login';
import { Main } from './pages/Main';


function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const location = useLocation();
  const navigate=  useNavigate();

  

    return ( 
    
    <Routes>

    
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
      
      <Route path="/" element={<Main setLoggedIn={setLoggedIn}/>} /> 

  </Routes>
    )
  
}

export default App;

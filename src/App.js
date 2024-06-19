import React, { useEffect, useState } from "react";
import Body from "./Body";
import Login from "./Login";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigate('/login');
    }
  }, [isLoggedIn, token]);
  
  return (
      <Routes>
        <Route path="/" element={<Body isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
  );
};

export default App;

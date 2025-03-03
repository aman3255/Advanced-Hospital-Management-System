import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import HospitalCreate from './components/HospitalCreate';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/hospitals/create" element={<HospitalCreate />} />
          <Route path="/" element={<h1>HMS - Use /signup, /signin, or /hospitals/create</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
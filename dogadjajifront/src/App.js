import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Pocetna from './Komponente/PocetnaStranica/Pocetna';
import Login from './Komponente/Sesija/Login';
import Register from './Komponente/Sesija/Register';
import Navbar from './Komponente/nav/Navbar';
import DogadjajiList from './Komponente/Dogadjaji/DogadjajiList';

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      <div className="App">
      <Navbar user={user} setUser={setUser} />
        <Routes>

          <Route path="/" element={<Pocetna />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dogadjaji" element={<DogadjajiList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Pocetna from './Komponente/PocetnaStranica/Pocetna';
import Login from './Komponente/Sesija/Login';
import Register from './Komponente/Sesija/Register';
import Navbar from './Komponente/nav/Navbar';
import DogadjajiList from './Komponente/Dogadjaji/DogadjajiList';
import SeasonTicketPackages from './Komponente/SeasonTickets/SeasonTicketPackages';
import EventsScraper from './Komponente/Dogadjaji/Scraper/EventsScraper';
import Dogadjaji from './Komponente/Admin/Dogadjaji';
import DogadjajForm from './Komponente/Admin/DogadjajForm';
import Admin from './Komponente/Admin/Admin';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/seasonTickets" element={<SeasonTicketPackages />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dogadjaji" element={<DogadjajiList />} />
          <Route path="/eventsScraper" element={<EventsScraper />} />
          <Route path="/dogadjajiAdmin" element={<Dogadjaji />} />
          <Route path="/dogadjaji/add" element={<DogadjajForm mode={"add"} />} />
          <Route path="/dogadjaji/update/:id" element={<DogadjajForm mode={"update"} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

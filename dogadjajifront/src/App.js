import logo from './logo.svg';
import './App.css';
import Pocetna from './Komponente/PocetnaStranica/Pocetna';
import Login from './Komponente/Sesija/Login';
import { useState } from 'react';

function App() {
  const[user,setUser]=useState();
  return (
    <div className="App">
      <Login setUser={setUser}></Login>
      <Pocetna></Pocetna>

    </div>
  );
}

export default App;

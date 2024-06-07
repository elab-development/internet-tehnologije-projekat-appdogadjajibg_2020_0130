import logo from './logo.svg';
import './App.css';
import Pocetna from './Komponente/PocetnaStranica/Pocetna';
import Login from './Komponente/Sesija/Login';
import { useState } from 'react';
import Register from './Komponente/Sesija/Register';

function App() {
  const[user,setUser]=useState();
  return (
    <div className="App">
        <Register></Register>
      <Login setUser={setUser}></Login>
      <Pocetna></Pocetna>

    </div>
  );
}

export default App;

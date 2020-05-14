import React from 'react';
import './App.css';
import qtechgroup from '../src/1.png';
import { Navbar } from './components/Navbar';
import { MdAccountCircle } from "react-icons/md";



function App() {
  

  return (
    <div>
     
      <header>
       
          <img class = "img" src={qtechgroup} />
          <Navbar/>

          <MdAccountCircle color ='green' size ='3rem'/>
          <button onclick="Login()"> <MdAccountCircle color ='green' size ='3rem'/> </button>
          
      </header>
     
    </div>
  );
}

export default App;

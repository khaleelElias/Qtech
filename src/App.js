import React from 'react';
import './App.css';
import qtechgroup from '../src/1.png'

import { CardBox } from './components/CardBox'
import { CardBox2 } from './components/CardBox2' 

function App() {
  return (
    <div>
      <header>
      <img class = "img" src={qtechgroup} />
        <CardBox />
       
      </header>
    </div>
  );
}

export default App;

import './App.css';
import Navbar from './Navbar'
import { Link, Router } from 'react-router-dom'
import {Home} from './components/Home'
import {MdAccountCircle} from './'
import React, { Component } from 'react'


class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      users:[]
         
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(Response => Response.json())
    .then(res => {
      if(res && res.data){
          this.setState({ users: [...this.state.users, ...res.data] })
      }
    });
      
  }

  renderUsers() {
    if(this.state.users.length <= 0){
      return <div>loading....</div>
    }
    else{
      return this.state.users.map((val, key) => {
        return <div key={key}>{val.name} | {val.age} </div>
      });
    }

  }

  render() {
    return (
      <div>
        
      <header>
       <Home/>
       
          <img class = "img" src={qtechgroup} />
          <Navbar/>

          <MdAccountCircle color ='green' size ='3rem'/>
          <button onclick="Login()"> <MdAccountCircle color ='green' size ='3rem'/> </button>
          
      </header>
      {this.renderUsers()}
    </div>
    )
  }
}

export default App

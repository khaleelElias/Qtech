import './App.css';
import Navbar from './components/Navbar'
import { Link, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Home } from './components/Home'
import React, { Component } from 'react'

import Routes from './routes'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      users:[]

         
    }
  }

  componentDidMount(){
    fetch('/users')
    .then(response => {
      console.log(response)
      return response.json()
    }).then(res => {
      console.log(res)
      if(res && res.data){
          this.setState({ users: [...this.state.users, ...res.data] })
      }
    }).catch(error => {
      console.log(error)
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
          <Router history={createBrowserHistory()}>
            <Routes />
          </Router>
        </header>
      {this.renderUsers()}
    </div>
    )
  }
}

export default App

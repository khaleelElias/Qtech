import './App.css';
import Navbar from './components/Navbar'
import { Link, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Home } from './components/Home'
import React, { Component } from 'react'

import Routes from './routes'

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <Router history={createBrowserHistory()}>
            <Routes/>
          </Router>
        </header>
    </div>
    )
  }
}

export default App

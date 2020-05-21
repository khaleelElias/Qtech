import './public/App.css';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
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

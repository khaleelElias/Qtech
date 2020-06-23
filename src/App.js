import './public/App.css';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import React, { Component } from 'react'

import Routes from './routes'

class App extends Component {

  constructor (props){
    super(props)
    
    //Uppdaterar sidan varje 5min
    setInterval(this.reloadPage, 300000)
  }

  reloadPage()  {
    window.location.reload(false);
  }

  render() {
    return (
      <div>
          <Router history={createBrowserHistory()}>
            <Routes/>
          </Router>
    </div>
    )
  }
}

export default App

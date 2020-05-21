import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import { Home } from '../components/Home'
import { Create_Column } from '../components/Create_Column'

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/CreateColumn" component={Create_Column} />
            </Switch>
        </Router>
    )
}
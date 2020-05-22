import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import { Home } from '../pages/Home'
import { Create_Column } from '../pages/Create_Column'

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
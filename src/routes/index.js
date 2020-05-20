import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import { Home } from '../components/Home'
import { Create_Post } from '../components/Create_Post' 
export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Create_Post" component={Create_Post} />
            </Switch>
        </Router>
    )
}
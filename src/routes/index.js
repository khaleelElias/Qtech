import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import { Home } from '../pages/Home'
import { Create_Column } from '../pages/Create_Column'
import { EditOrder } from '../pages/EditOrder'
import { EditProject } from '../pages/EditProject'

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/CreateColumn" component={Create_Column} />
                <Route path="/EditOrder" component={EditOrder}/>
                <Route path="/EditProject" component={EditProject} />
            </Switch>
        </Router>
    )
}
import React, { Component } from 'react'
import "../public/style.css"
import { Activity, Order, Section, Project } from '../components/dashboard/index'
import {Stack,StackItem } from 'office-ui-fabric-react'

export class Dashboard extends Component {
    
    render() {
        return (
            <div>
                <Stack horizontal class="dashboardHeight" >
                    <StackItem  className = "Dashboard_Columns">
                        <Activity loadData={this.props.loadData}/>
                    </StackItem>

                    <StackItem className = "Dashboard_Columns">
                        <Project history={this.props.history}/>
                    </StackItem>
                    
                    <StackItem className = "Dashboard_Columns">
                        <Order history={this.props.history}/>
                    </StackItem>
                    
                    <StackItem  className = "Dashboard_Columns">
                        <Section/>
                    </StackItem>
                            
                </Stack>
            </div>
        )
    }
}

const test = {
    border: '1px solid black'
}
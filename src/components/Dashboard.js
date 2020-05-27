import React, { Component } from 'react'
import { Stack, StackItem } from 'office-ui-fabric-react'
import "../public/style.css"
import { Activity, Order, Section, Project } from '../components/dashboard/index'

export class Dashboard extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <Stack horizontal className="dashboardHeight" >
                    <StackItem grow={1} verticalFill className = "Dashboard_Columns" >
                        <Activity/>
                    </StackItem>

                    <StackItem grow={1} verticalFill className = "Dashboard_Columns">
                        <Project/>
                    </StackItem>
                    
                    <StackItem grow={1} verticalFill className = "Dashboard_Columns">
                        <Order history={this.props.history}/>
                    </StackItem>
                    
                    <StackItem grow={1} verticalFill className = "Dashboard_Columns">
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
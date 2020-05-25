import React, { Component } from 'react'
import { Stack, StackItem } from 'office-ui-fabric-react'
import "../public/style.css"
import { Activity, Order, Section, Project } from '../components/dashboard/index'
import { Persona, Text } from 'office-ui-fabric-react'

export class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ordersData: []
        }

        this.getOrders()
    }


    getOrders = () => {
        fetch("/orders", {
            method:'GET',
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then( res => { console.log(res.status); return res.json()})
        .then( data => {
            console.log(data)
            this.setState({ordersData: [...data.orders]})
        })
        .catch( error => {
            console.error("error fetching orders: ", error)
        })
    }



    render() {
        return (
            <div>
                <Stack horizontal className="dashboardHeight">
                    <StackItem grow={1} verticalFill className = "Dashboard_Columns" >
                        <h1 className="dashboardItems">Activity</h1>
                    </StackItem>

                    <StackItem grow={1} verticalFill className = "Dashboard_Columns">
                    <h1 className="dashboardItems">Projekt</h1>
                        
                        
                    </StackItem>
                    
                    <StackItem grow={1} verticalFill className = "Dashboard_Columns">
                            <Stack horizontal horizontalAlign="center" gap={5} className="dashboardHeaders">
                                <Text variant="xxLargePlus">Orders/ald</Text>
                                <Persona />
                            </Stack>
                        <Order/>
                    </StackItem>
                    
                    <StackItem grow={1} verticalFill className = "Dashboard_Columns">
                        <h1 className="dashboardItems">section</h1>
                    </StackItem>
                            
                </Stack>
            </div>
        )
    }
}

const test = {
    border: '1px solid black'
}
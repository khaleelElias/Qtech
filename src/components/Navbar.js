import React, { Component } from 'react'
import { Action_Menu } from './Action_Menu'
import { Week_Number } from './Week_Number'
import { Stack, StackItem } from 'office-ui-fabric-react'

export class Navbar extends Component {
    constructor(props){
        super(props)

        
    }
    render() {
        

        return (
            <div className = "Navbar">
                <Stack horizontal>
                    <Week_Number/>
                    <Action_Menu reloadData={this.props.loadData} history={this.props.history} />
                
                </Stack>
                
            </div>
        )
    }
}

/*
<div class="ms-Grid" dir="ltr">
                    <div class="ms-Grid-row">
                        <div class="ms-Grid-col ms-sm12 ms-lg4">
                            <Week_Number/>
                            { this.props.actionMenuHidden ? null : <Action_Menu reloadData={this.props.loadData} history={this.props.history} />}
                        </div>
                        <div class="ms-Grid-col ms-sm12 ms-lg4">
                            <center>
                                <h1> {this.props.title || "" }</h1>
                            </center>
                        </div>
                    </div>
                </div>

*/
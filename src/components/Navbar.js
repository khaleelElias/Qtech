import React, { Component } from 'react'
import {Action_Menu} from './Action_Menu'
import {Week_Number} from './Week_Number'
import { Stack } from 'office-ui-fabric-react'

export class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <Stack horizontal>
                <Week_Number/>
                <Action_Menu reloadData={this.loadData.bind(this)} history={this.props.history} />
                </Stack>
            </div>
        )
    }
}



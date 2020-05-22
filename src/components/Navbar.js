import React, { Component } from 'react'
import { Action_Menu } from './Action_Menu'
import { Week_Number } from './Week_Number'
import { Stack } from 'office-ui-fabric-react'

export class Navbar extends Component {
    render() {
        return (
            <div>
                <Stack horizontal>
                    <Week_Number/>
                    <Action_Menu reloadData={this.props.loadData} history={this.props.history} />
                </Stack>
            </div>
        )
    }
}

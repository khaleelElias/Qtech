import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react';

import '../public/style.css'
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { getWeekNumber } from '../constants/index'
import { View_Persona } from './View_Persona' 
import { Action_Menu } from './Action_Menu'

export class UserBar extends React.Component{
    render() {
        console.log("data: " , this.props.users)
        return(
            <div class = "header ">
                <Stack horizontal>
                    <Stack>
                        <Stack horizontal>
                            {
                                this.props.users.slice(0, 30).map( (value, index) => {
                                    return (
                                       <View_Persona name={value.username} status={value.status} id={value.id} index={index} reloadData={this.loadData.bind(this)} />
                                    )
                                })
                            }
                            <Action_Menu reloadData={this.props.loadData} history={this.props.history} />
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        )
    }
}
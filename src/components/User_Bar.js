import * as React from 'react';

import '../public/style.css'
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { View_Persona } from './View_Persona' 
import { Action_Menu } from './Action_Menu'

export class UserBar extends React.Component{
    render() {
        return(
            <div className = "header ">
                <Stack horizontal>
                    <Stack>
                        <Stack horizontal>
                            {
                                this.props.users.slice(0, 30).map( (value, index) => {
                                    return (
                                       <View_Persona name={value.username} status={value.status} id={value.id} index={index} loadData={this.props.loadData} type="0" hidePersonaDetails={true} />
                                    )
                                })
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        )
    }
}
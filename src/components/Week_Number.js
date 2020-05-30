import React, { Component } from 'react'
import '../public/style.css'
import { getWeekNumber } from '../constants/index'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Stack } from 'office-ui-fabric-react'
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

const iconClass = mergeStyles({
    fontSize: 40,
    height: 40,
    width: 40,
    marginLeft: '15px',
    marginRight: '10px'
  });
  

export class Week_Number extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <Stack horizontal>
                <Stack.Item align="center">
                    <FontIcon iconName="Calendar" className={iconClass} />
                    
                    

                </Stack.Item>
                <Stack.Item align="center">
                     <h2 style={{margin:0, fontFamily:'Roboto'}}>{ getWeekNumber() }</h2>
                </Stack.Item>
                
            </Stack>
        )
    }
}


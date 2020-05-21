import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react';

import './style.css'
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { getWeekNumber } from '../constants/index'
import { View_Persona } from './View_Persona' 
import { Sub_Menu } from './Sub_Menu'

export class CardBox extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            data: []
        }
        this.loadData()
    }

    loadData = () => {
        fetch('/users')
        .then(Response => Response.json())
        .then(res => {
            console.log(res)
            //this.setState({ data: [...this.state.data, ...res.users ]}) //create user
            this.setState({data: [...res.users]})
        }).catch( error => {
            console.log("error: ", error)
        })
    }

    render() {
        console.log("data: " , this.state.data)
        return(
            <div class = "header ">
                <Stack horizontal>
                    <Stack>
                        <Stack horizontal>
                            {
                                this.state.data.slice(0, 30).map( (value, index) => {
                                    return (
                                       <View_Persona name={value.username} status={value.status} id={value.id} index={index} reloadData={this.loadData.bind(this)} />
                                    )
                                })
                            }

                            <Sub_Menu reloadData={this.loadData.bind(this)} history={this.props.history} />
                            <h2>vecka: {getWeekNumber()}</h2>

                        </Stack>
                    </Stack>
                </Stack>
                <CommandBarButton 
              style={{margin:10, padding:10}}
              items={this._items}
              text= {getWeekNumber()}
              iconProps={{iconName: "Calendar"}}
              menuProps={this.subMenuProps}  
            />
            </div>
        )
    }

}
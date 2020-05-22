import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react';

import '../public/style.css'
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { getWeekNumber } from '../constants/index'
import { View_Persona } from './View_Persona' 
import { Action_Menu } from './Action_Menu'

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

                            <Action_Menu reloadData={this.loadData.bind(this)} history={this.props.history} />
                            

                        </Stack>
                    </Stack>
                </Stack>
               
            </div>
        )
    }

}
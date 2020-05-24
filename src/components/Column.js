import * as React from 'react';
import '../public/style.css'
import { IconButton, Stack, initializeIcons  } from 'office-ui-fabric-react';
import { View_Persona } from './View_Persona'

export class Column extends React.Component{

    constructor(props){
        super(props)
        initializeIcons()

        this.state = {
            supervisor: {},
        }

        this.fetchSupervisor()
    }

    render(){
        return(
            <div class="row">

                <div class="column">
                <IconButton size="100" iconProps={{ iconName: 'EditMirrored' }} title="Add" ariaLabel="Add" style={{ right:0}} />
                <View_Persona name={this.state.supervisor.name} status={this.state.supervisor.status} />
               
                <h2>{this.props.column.title}</h2>
                <p>{this.props.column.message}</p>
                

                </div>
            </div>

        )
    }

    fetchSupervisor = (id) => {
        fetch('/users?id=' + id)
        .then(Response => Response.json())
        .then(res => {
            console.log(res)
            this.setState({ supervisor: [...res.user]})
        }).catch( error => {
            console.log("error: ", error)
        })
    }
}
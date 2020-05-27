import * as React from 'react';
import '../public/style.css'
import { IconButton, Stack, initializeIcons  } from 'office-ui-fabric-react';
import { Column_Persona } from './Column_Persona'

export class Column extends React.Component{

    constructor(props){
        super(props)
        initializeIcons()

        this.state = {
            supervisor: null,
        }

        this.getUserById(this.props.column.supervisor)
    }

    render(){
        return(
            <div className="row">
                <div className="column">
                    <IconButton size="100" iconProps={{ iconName: 'Edit' }} title="Add" ariaLabel="Add" style={{ right:0}} />
                    {   
                        this.state.supervisor != null && (
                            <Column_Persona name={this.state.supervisor.name} status={this.state.supervisor.status} changeSupervisor={ this.changeSupervisor.bind(this)} />
                        )
                    }
                    <h2>{this.props.column.title}</h2>
                    <p>{this.props.column.message}</p>
                </div>
            </div>
        )
    }

    getUserById = (id) => {
        fetch('/users?id=' + id)
        .then(Response => Response.json())
        .then(res => {
            this.setState({supervisor: res.user})
        }).catch( error => {
            console.log("error: ", error)
        })
    }

    changeSupervisor = (id) =>    {
        console.log(id)
        fetch('/columns', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "title=" + this.props.column.title + "&message=" + this.props.column.message + "&supervisor=" + id
            + "&type=" + this.props.column.type + "&id=" + this.props.column.id
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
        }).catch(error =>   {
            console.log(error)
        })
    }
}
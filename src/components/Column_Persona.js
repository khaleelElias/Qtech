import React, { Component } from 'react'
import { Callout, IconButton } from 'office-ui-fabric-react';
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import '../public/style.css'

export class Column_Persona extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShown: false,
            users: []
        }

        this.loadUsers()
    }

    switchStatus = {
        "bad": PersonaPresence.busy,
        "good": PersonaPresence.online,
        "well": PersonaPresence.away
    }

    render() {
        return (
            <div>
                <div className = "header">                              
                    <div className = "persona">
                        <Persona
                            text={this.props.name}
                            key={"keyOfPersona: " + this.props.index}
                            size={PersonaSize.size32}
                            hidePersonaDetails
                            presence={this.switchStatus[this.props.status]}
                            imageAlt=""
                            onClick={ () => { this.setState({isShown: !this.state.isShown})}}
                        />
                    </div>
                </div>
                {
                    this.state.isShown && (
                        <Callout 
                        onDismiss={ () => this.setState({isShown: false})} >
                            <label>Välj en ansvarig!</label><br/>
                            <select onChange={(e) => { this.props.changeSupervisor(e.target.value) }}>
                                { this.state.users.map((user) => <option key={user.key} value={user.key}>{user.value}</option> ) }
                            </select>
                        </Callout>
                    )
                }
            </div>
        )
    }

    loadUsers = () => {
        fetch('/users')
        .then(Response => Response.json())
        .then(res => {            
            let usersFromApi = res.users.map( user =>   {
                return {key: user.id, value: user.username }
            });

            this.setState({ users: [{key: '', value: '(Välj en ansvarig!)'}].concat(usersFromApi)})
        }).catch( error => {
            console.log("error: ", error)
        })
    }

}
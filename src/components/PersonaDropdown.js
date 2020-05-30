import React, { Component } from 'react'
import { Callout, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react'
import { View_Persona } from './View_Persona'
import '../public/style.css'


const data = [ {text:"Robin Sauma"}, {text:"Khaleel Elias"}, {text:"Fahed Yousif"}]

export class PersonaDropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            picked: "",
            showOptions:false,
            users:[]
        }

        this.fetchUsers()
        this.getUserById(this.props.supervisorId)

    }

    fetchUsers = () => {
        fetch('/users')
        .then(Response => Response.json())
        .then(res => {
            console.log(res)
            this.setState({users: [...res.users]})
        }).catch( error => {
            console.log("error: ", error)
        })
    }

    reloadData = () => {
        this.fetchUsers()
        this.props.loadData()
    }

    getUserById = (id) => {
        console.log("getting user with id: ", id)
        fetch('/users?id=' + id)
        .then(res => res.json())
        .then(data => {
            console.log("achieved user: ", data)
            this.setState({picked: data.user || ""})
        }).catch( error => {
            console.log("error: ", error)
        })
    }

    changeSupervisor = (columnId, person) =>    {
        console.log("called changeSupervisor with columnId: ", columnId , " and person: ", person)
        fetch('/columns/changeSupervisor', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: person.id,
                columnId: columnId
            })
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
            this.setState({picked: person})
        }).catch(error =>   {
            console.log(error)
        })
    }

    switchStatus = {
        "bad": PersonaPresence.busy,
        "good": PersonaPresence.online,
        "well": PersonaPresence.away
    }

    render() {
        console.log("rendering ")
        return (
            <div>
                <Persona 
                    text = {this.state.picked.username}
                    hidePersonaDetails
                    size={PersonaSize.size40}
                    presence={this.switchStatus[this.state.picked.status]}

                    id={this.props.id}
                    onClick={ () => {  this.setState({showOptions: true})}}
                />
                {
                    this.state.showOptions && (
                        <Callout
                            onDismiss={ () => this.setState({showOptions: false})}
                            target={`#${this.props.id}`}    
                        >
                            
                        {
                            this.state.users.map( (value) => {
                                return (
                                    <Persona className = "Persona_In_Dropdown"
                                        text={value.username}
                                        size={PersonaSize.size24}
                                        presence={this.switchStatus[value.status]}
                                        onClick={ () => this.changeSupervisor(this.props.columnId, value)}
                                    />
                                )
                            })
                        }
                        
                            
                        </Callout>
                    )
                }
            </div>
        )
    }


   
}
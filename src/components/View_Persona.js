import React, { Component } from 'react'
import { Callout} from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import {Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import './style.css';
import {statusOptions} from '../constants/index'

export class View_Persona extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShown: false,
            changeing: false
        }
    }

    changeStatus = (status, id) => {
        fetch('/users/status', {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id,
                status: status.key
            })
        })
        .then(Response => Response.json())
        .then( () => {
            this.setState({isShown:false})
            this.props.reloadData()
        }).catch(error => {
            console.log("error status", error)
        })
    }

    switchStatus = {
        "bad": PersonaPresence.busy,
        "good": PersonaPresence.online,
        "well": PersonaPresence.away
    }

    render() {
        return (
            <div>
                <div class = "header">                              
                    <div class = "persona">
                        <Persona
                            text={this.props.name}
                            key={"keyOfPersona: " + this.props.index}
                            size={PersonaSize.size32}
                            hidePersonaDetails
                            presence={this.switchStatus[this.props.status]}
                            imageAlt="Annie Lindqvist, status is online."
                            
                            onClick={ () => { this.setState({isShown: !this.state.isShown})}}
                        />
                    </div>
                </div>
                {
                    this.state.isShown && (
                    <Callout
                    onDismiss={ () => this.setState({isShown: false})} >
                        <Dropdown className ="Dropdown"
                            label="Hur mår du idag?"
                            placeholder="Select an option"
                            
                            options={statusOptions}
                            onChange={ ({}, item) => this.changeStatus(item, this.props.id) }
                        />
                    </Callout>
                    )
                }
            </div>
        )
    }
}


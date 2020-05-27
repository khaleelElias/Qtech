import React, { Component } from 'react'
import { Stack, StackItem } from 'office-ui-fabric-react'
import { Persona,PersonaSize, Text } from 'office-ui-fabric-react'
import "../../public/style.css"
export class Activity extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }   

    render() {
        return (
            <div>
            <Stack>
                <h1 className = "dashboardHeaders"> Activity </h1>
                <Persona {...Persona} text = "" size={PersonaSize.size32} />
            </Stack>
            </div>
        )
    }
}


import React, { Component } from 'react'
import { Persona, PersonaSize,  Text, divProperties, Stack, personaSize, DefaultButton } from 'office-ui-fabric-react'

export class Section extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <Stack>
                <Stack >
                    <Stack horizontal  gap = {8} className = "Dashboard_Titles">
                        <DefaultButton   text="SECTION" onClick={() => {this.redirectFunc()}} />
                        <Persona size={PersonaSize.size40}/>
                    </Stack>
                    <Text style = {{textAlign: "center", fontFamily: "Times"}}>Hr, Converse All Star, Reebok Classic Leather</Text>
                   
                
                </Stack>
            </Stack>
        )
    }
    
}


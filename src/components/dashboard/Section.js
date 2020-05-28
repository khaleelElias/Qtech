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
                    <Text style = {{textAlign: "center", fontFamily: "Times"}}>Här kan ni se alla våra sneakers som vi har inne i butiken. Sneakers-modeller från Nike Air Max 90, Nike Air Force 1, Nike Air Max 270, Nike VaporMax, adidas Superstar, adidas Stan Smith, adidas Continental 80, FILA Disruptor, Converse All Star, Reebok Classic Leather</Text>
                   
                
                </Stack>
            </Stack>
        )
    }
}


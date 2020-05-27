import React, { Component } from 'react'
import { Persona, PersonaSize,  Text, divProperties, Stack, personaSize, DefaultButton } from 'office-ui-fabric-react'
import '../../public/style.css'

export class Activity extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }   

    IActivityStyleProps = {
        borderBlockEnd:" 1px solid red", 
        padding:10,
        
    }

    render() {
        return (
            <Stack >
                <Stack style= {this.IActivityStyleProps} >
                    <DefaultButton  className = "Dashboard_Titles" text="KUND / LEVERANTÖRSMÖTE"/>
                    <Text style = {{textAlign: "center", fontFamily: "Times"}}>Här kan ni se alla våra sneakers som vi har inne i butiken. Sneakers-modeller från Nike Air Max 90, Nike Air Force 1, Nike Air Max 270, Nike VaporMax, adidas Superstar, adidas Stan Smith, adidas Continental 80, FILA Disruptor, Converse All Star, Reebok Classic Leather</Text>
                </Stack>

                <Stack style= {this.IActivityStyleProps} >
                    <DefaultButton  className = "Dashboard_Titles" text="LEDIGHET"/>
                    <Text style = {{textAlign: "center", fontFamily: "Times"}}>Här kan ni se alla våra sneakers som vi har inne i butiken. Sneakers-modeller från Nike Air Max 90, Nike Air Force 1, Nike Air Max 270, Nike VaporMax, adidas Superstar, adidas Stan Smith, adidas Continental 80, FILA Disruptor, Converse All Star, Reebok Classic Leather</Text>

            
                </Stack>
                <Stack style= {this.IActivityStyleProps} >
                    <DefaultButton  className = "Dashboard_Titles" text="MARKNAD"/>
                    <Text style = {{textAlign: "center", fontFamily: "Times", paddingBlockEnd: "2%"}}>Här kan ni se alla våra sneakers som vi har inne i butiken. Sneakers-modeller från Nike Air Max 90, Nike Air Force 1, Nike Air Max 270, Nike VaporMax, adidas Superstar, adidas Stan Smith, adidas Continental 80, FILA Disruptor, Converse All Star, Reebok Classic Leather</Text>
                </Stack>
            </Stack>
        )
    }
}


import React, { Component } from 'react'
import { Persona, PersonaSize,  Text, divProperties, Stack, personaSize, DefaultButton, NormalPeoplePicker} from 'office-ui-fabric-react'
import '../../public/style.css'

import { PersonaDropdown } from '../PersonaDropdown'

export class Activity extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns:[]
        }

        this.fetchColumns()
    }

    IActivityStyleProps = {
        borderBlockEnd:" 1px solid red", 
        padding:10
        
    }

    fetchColumns = () => {
        fetch("/columns")
        .then(res => res.json())
        .then(data => {
            console.log("fetching columns: ", data)
            this.setState({columns: [...data.columns]})
        })
        .catch(error => {
            console.log("error fethcing columns: ", error)
        })
    }

    render() {
        return (
            <Stack >
                 <Stack >
                    
                    {
                        this.state.columns.map( (column) => {
                            return (
                                <div>
                                    <Stack>
                                        <Stack horizontal  gap={8} className = "Dashboard_Titles">
                                            <DefaultButton   text={column.title} onClick={() => {this.redirectFunc()}} />
                                            <PersonaDropdown id={"dinpap"} loadData={this.props.loadData} columnId={column.id} supervisorId={column.supervisor}/>
                                        </Stack>
                                        <Text className= "Actevity_Text">{column.message}</Text>
                                    </Stack>
                                    
                                </div>
                            )
                        })
                    }
                   
                
                </Stack>
            </Stack>
        )
    }

    



    
}

/*

                    <Text style = {{textAlign: "center", fontFamily: "Times"}}>Här kan ni se alla våra sneakers som vi har inne i butiken. Sneakers-modeller från Nike Air Max 90, Nike Air Force 1, Nike Air Max 270, Nike VaporMax, adidas Superstar, adidas Stan Smith, adidas Continental 80, FILA Disruptor, Converse All Star, Reebok Classic Leather</Text>
*/


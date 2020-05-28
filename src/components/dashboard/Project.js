import React, { Component } from 'react'
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Persona, PersonaSize,  Text, divProperties, Stack, personaSize, DefaultButton } from 'office-ui-fabric-react'
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';




const iconClass = mergeStyles({
    fontSize: 40,
    height: 40,
    width: 40,
    margin: '0 25px',
  });
  const classNames = mergeStyleSets({
    deepSkyBlue: [{ color: 'gray' }, iconClass],
    greenYellow: [{ color: 'greenyellow' }, iconClass],
    salmon: [{ color: 'salmon' }, iconClass],
  });

export class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <Stack>
                 <Stack>
                    <Stack horizontal  className = "Dashboard_Titles">
                        <FontIcon className={classNames.deepSkyBlue}  iconName="TextDocumentShared"/>
                        <DefaultButton  text="Projekt" onClick={() => {this.redirectFunc()}} />
                        <Persona size={PersonaSize.size40}/>
                    </Stack>
                    <Text style = {{textAlign: "center", fontFamily: "Times"}}>Här kan ni se alla våra sneakers som vi har inne i butiken. Sneakers-modeller från Nike Air Max 90, Nike Air Force 1, Nike Air Max 270, Nike VaporMax, adidas Superstar, adidas Stan Smith, adidas Continental 80, FILA Disruptor, Converse All Star, Reebok Classic Leather</Text>
                   
                
                </Stack>
            </Stack>
        )
    }
}

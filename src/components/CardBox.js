import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Callout} from 'office-ui-fabric-react';

const dummyData = [ {name:"Khaleel Elias", online:"online"} , {name:"Robin Sauma", online:"busy"}]

export class CardBox extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            isShown: false
        }  
    }

    render() {
        return(
            <div>
                <Stack horizontal>
                    <Stack>
                        <Label>Online</Label>
                        <Stack horizontal>
                            {
                                dummyData.map( (value) => {
                                    return (
                                        <Persona
                                            text={value.name}
                                            size={PersonaSize.size72}
                                            hidePersonaDetails
                                            presence={PersonaPresence[value.online]}
                                            imageAlt="Annie Lindqvist, status is online."
                                            onClick={ () => { this.setState({isShown: !this.state.isShown}) }}
                                        />
                                    )
                                })
                            }
                            {
                                this.state.isShown && (
                                    <Callout>
                                        <p>Text</p>
                                    </Callout>
                                    )
                                
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        )
    }

}

const rootClass = mergeStyles({
  selectors: {
    '.ms-Persona': {
      margin: '0 20px 20px 0',
    },
  },
});

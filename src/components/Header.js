import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Callout} from 'office-ui-fabric-react';

const dummyData = [ {name:"Khaleel Elias", online:"online"} , {name:"Robin Sauma", online:"blocked"}, {name:"Fahed Yousef q    ", online:"busy"}, {name:"Robin Sauma", online:"busy"}, {name:"Robin Sauma", online:"busy"},{name:"Khaleel Elias", online:"online"} , {name:"Robin Sauma", online:"busy"}, {name:"Robin Sauma", online:"busy"}, {name:"D E", online:"do not disturb"}, {name:"A B", online:"away"}]

export class CardBox extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isShown: false
        }  
    }

    render() {
        return(
            <div class = "header ">
                <Stack horizontal>
                    <Stack>
                        <Stack horizontal>
                            {
                                dummyData.slice(0, 5).map( (value) => {
                                    return (
                                        <div class = "persona">
                                        <Persona
                                            text={value.name}
                                            size={PersonaSize.size32}
                                            hidePersonaDetails
                                            presence={PersonaPresence[value.online]}
                                            imageAlt="Annie Lindqvist, status is online."
                                        />
                                        </div>
                                    )
                                })
                             
                            }
                            {
                                
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

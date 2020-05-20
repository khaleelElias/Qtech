import * as React from 'react';
import { Stack, initializeIcons  } from 'office-ui-fabric-react';
import { CardBox } from './User_Bar'
import {Kund} from './kund-leverans'

import {Qtech_Logo} from './Qtech_Logo'





export class Home extends React.Component{



    constructor(props){
        super(props)
        initializeIcons()
    }

    
    render() {
        return(
            <div class = "header">
                <header>
               <Qtech_Logo/>
                <Stack horizontal style={{width:"100%", display:"flex"}}>
                    < CardBox/>
                </Stack>
                <Kund/> 
                </header>
            </div>
        );
    }


}
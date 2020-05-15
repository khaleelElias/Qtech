import * as React from 'react';
import qtechgroup from '../1.png'
import { IconButton, Stack, initializeIcons  } from 'office-ui-fabric-react';
import { CardBox } from './Header'
import { KhaleelElias } from './khaleel'
import {Kund} from './kund-leverans'



export class Home extends React.Component{



    constructor(props){
        super(props)
        initializeIcons()
    }
    render() {
        return(
            <div class = "header">
                <header>
    
                <a  href="https://qtechgroup.sharepoint.com/SitePages/Intranet.aspx">
                    <img class = "img" src={qtechgroup}/>
                </a>

                <Stack horizontal style={{width:"100%", display:"flex"}}>
                    < CardBox/>
                    <IconButton size="100" iconProps={{ iconName: 'Add' }} title="Add" ariaLabel="Add" style={{position:"absolute", right:0}} />

                </Stack>


                <Kund/>
                <KhaleelElias/>
            
                </header>
            </div>
        );
    }


}
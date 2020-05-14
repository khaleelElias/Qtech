import * as React from 'react';
import qtechgroup from '../1.png'
import { CardBox } from './Header'
import { KhaleelElias } from './khaleel'
import {Kund} from './kund-leverans'



export class Home extends React.Component{



    constructor(props){
        super(props)
    }
    render() {
        return(
            <div class = "header">
              <header>
        
        <a  href="https://qtechgroup.sharepoint.com/SitePages/Intranet.aspx">
      <img class = "img" src={qtechgroup}/>
      </a>

        < CardBox/>
        <Kund/>
        <KhaleelElias/>
       
      </header>

            </div>
        );
    }


}
import * as React from 'react';
import './style.css'
import { IconButton, Stack, initializeIcons  } from 'office-ui-fabric-react';




export class Kund extends React.Component{

    constructor(props){

        super(props)
        initializeIcons()
    }

    render(){

        return(
            <div class="row">

            <div class="column">
            <IconButton size="100" iconProps={{ iconName: 'EditMirrored' }} title="Add" ariaLabel="Add" style={{ right:0}} />

               
                <h2>Projekt</h2>
                <p>test1</p>
                <p>test2</p>
                <p>test3</p>
                <p>test4</p>

            </div>
            <div class="column">
            <IconButton size="100" iconProps={{ iconName: 'EditMirrored' }} title="Add" ariaLabel="Add" style={{ right:0}} />

                
                <h2>Column 2</h2>
                <p>Some text..</p>
            </div>
            <div class="column">
            <IconButton size="100" iconProps={{ iconName: 'EditMirrored' }} title="Add" ariaLabel="Add" style={{ right:0}} />

                <h2>Column 3</h2>
                <p>Some text..</p>
            </div>
            <div class="column">
                <h2>Column 4</h2>
                <p>Some text..</p>
            </div>
            <div class="column">
                <h2>Column 5</h2>
                <textarea></textarea>
            </div>

            </div>
            


            )
    }


}
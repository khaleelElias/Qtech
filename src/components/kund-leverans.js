import * as React from 'react';
import './style.css'
import { CardBox } from './Header'



export class Kund extends React.Component{

    constructor(props){

        super(props)
    }

    render(){

        return(
            <div class="row">
            <div class="column">
                <CardBox/>
                <h2>Column 1</h2>
                <p>Some text..</p>
            </div>
            <div class="column">
                <h2>Column 2</h2>
                <p>Some text..</p>
            </div>
            <div class="column">
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
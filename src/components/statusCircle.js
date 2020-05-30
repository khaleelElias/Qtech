import * as React from 'react';
import '../public/style.css'
import { orderStatus } from '../constants/index'
export class StatusCircle extends React.Component   {
    render()    {
        return(
            <div
                class="statusCircle" 
                style={ { backgroundColor: orderStatus[this.props.status]}} 
                onClick={() => {this.props.updateStatus(this.props.id, this.props.status)} }
            />
        )
    }
}
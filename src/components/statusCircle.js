import * as React from 'react';
import '../public/style.css'
import { switchStatusColor } from '../constants/index'
export class StatusCircle extends React.Component   {
    render()    {
        return(
            <div
                className="statusCircle"
                style={ { backgroundColor: switchStatusColor(this.props.status) }}
                onClick={() => {this.props.updateStatus(this.props.id, this.props.status)} }
            />
        )
    }
}
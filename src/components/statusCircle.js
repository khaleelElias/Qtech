import * as React from 'react';
import '../public/style.css'

export class StatusCircle extends React.Component   {
    render()    {
        return(
            <div class="statusCircle" style={ { backgroundColor: this.props.status === "good" ? "#00FF7F" : this.props.status === "normal" ? "#FFFF00" : "#FF0000"}} 
            onClick={() => {this.props.updateStatus(this.props.id, this.props.status)} }/>
        )
    }
}
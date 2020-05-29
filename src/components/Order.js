import React, { Component } from 'react'
import "../public/style.css"
import { Stack, initializeIcons, Toggle, Modal, StackItem } from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react';
import { statusOptions } from '../constants/index'
import { Text, ITextProps } from 'office-ui-fabric-react/lib/Text';
import { StatusCircle } from '../components/statusCircle'

export class Order extends Component {
    render() {
        return (
            <Stack>
                <Text variant={'large'} >
                <Stack horizontal style={{ width: "100%" }}>
                    <Toggle defaultChecked={this.props.order.priority === 1 ? true : false} onChange={(e, checked) => { this.updatePriority(this.props.order.id, checked)} } />
                    <div width="50px"> {this.props.order.orderNumber} </div>
                    <div width="50px"> {this.props.order.company} </div>
                    <label> {this.props.order.title} </label>
                    <label> {this.props.order.date} </label>
                    <StatusCircle style={{ float: "right"}} status={this.props.order.status} id={this.props.order.id} updateStatus={this.props.updateStatus} />
                </Stack></Text>
            </Stack>
        )
    }
}
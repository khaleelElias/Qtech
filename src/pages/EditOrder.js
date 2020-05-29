import React, { Component } from 'react'
import { Navbar } from '../components/Navbar'
import "../public/style.css"
import  qtechgroup from '../public/qtechgroup.png'
import { Stack, initializeIcons, Toggle, Modal, StackItem, DetailsList, SelectionMode } from 'office-ui-fabric-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { statusOptions } from '../constants/index'
import { Text, ITextProps } from 'office-ui-fabric-react/lib/Text';
import { Order } from "../components/Order.js"
import { StatusCircle } from '../components/statusCircle'

export class EditOrder extends Component {
    
    _columns = [
        { 
            key: 'priorityColumn', 
            name: 'priority', 
            fieldName: 'priority', 
            minWidth: 50, 
            maxWidth: 100, 
            onRender: (item) => { return <Toggle defaultChecked={item.priority === 1 ? true : false} onChange={(e, checked) => { this.updatePriority(item.id, checked)} } />}
        },
        { 
            key: 'orderNrColumn',
            name: 'order number', 
            fieldName: 'orderNumber', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'companyColumn',
            name: 'company', 
            fieldName: 'company', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'titleColumn',
            name: 'title', 
            fieldName: 'title', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'dateColumn',
            name: 'date', 
            fieldName: 'date', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'statusColumn',
            name: 'status', 
            fieldName: 'status', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true,
            onRender: (item) => { return <StatusCircle status={item.status} id={item.id} updateStatus={this.updateStatus.bind(this)} />}
        }
    ];

    constructor(props) {
        super(props)
        initializeIcons()

        this.state = {
            orders: [],
            showModul: false,
            orderNumber: "",
            company: "",
            title: "",
            date: "",
            status: "normal",
            columnId: 0,
            priority: 0,
        }

        this.getOrders()
    }


    render() {
        return (
            <div>
                <a href="https://qtechgroup.sharepoint.com/SitePages/Intranet.aspx">
                    <img className = "img" src={qtechgroup}  alt=''/>
                </a>
                <Navbar />
                <StackItem className = "Dashboard_Titles">
                <Text variant={'xxLarge'}>  ORDER/INKÖP</Text>
                </StackItem>
                <div>
                    <PrimaryButton text="Skapa order" onClick = { () => { this.setState({ showModul: true }) }} style={{marginTop: "10px"}} />
                    <Stack>
                        
                        
                        <DetailsList
                            items={ this.state.orders }
                            columns={this._columns}
                            setKey="set"
                            selectionMode={SelectionMode.none}
                        />
                        
                        {
                            this.state.showModul && (
                            <Modal className = "Modal"
                                isOpen={this.state.showModul}
                                onDismiss={() => this.setState({showModul: !this.state.showModul}) }
                                isBlocking={false}
                            >
                                <form className="Modal_New_User">
                                <h2>Lägg till ny order</h2>
                                <TextField label="Order nummer" className ="TextField" value={this.state.orderNumber} onChange={(e) => {this.setState({ orderNumber: e.target.value}) }}/>
                                <TextField label="Order company" className ="TextField" value={this.state.company} onChange={ (e) => { this.setState({company: e.target.value}) }}/>
                                <TextField label="Order titel" className ="TextField" value={this.state.title} onChange={ (e) => { this.setState({ title: e.target.value}) }}/>
                                <TextField label="Order datum" className ="TextField" value={this.state.date} onChange={ (e) => { this.setState({date: e.target.value}) }}/>
                                <div style={{padding: "10px"}}> Status
                                    <StatusCircle status={this.state.status} updateStatus={(id, status) => {this.setState({ status: status === "good" ? "normal" : status === "normal" ? "bad" : "good"})}} />
                                </div>
                                <div style={{padding: "10px"}}> Prioriterad
                                    <Toggle defaultChecked={this.state.priority} onChange={(e, checked) => { this.setState({ priority: checked }) } } />
                                </div>
                                <PrimaryButton text="Skapa order" onClick = { () => { this.createOrder(); this.getOrders();}} style={{marginTop: "10px"}} />
                                </form>
                            </Modal>
                            )
                        }
                    </Stack>
                </div>
            </div>
        )
    }

    getOrders = () => {
        fetch("/orders")
        .then( res => res.json())
        .then( data => {
            console.log(data)
            this.setState({orders: [...data.orders]})
        })
        .catch( error => {
            console.error("error fetching orders: ", error)
        })
    }

    createOrder = () => {
        this.setState({ priority: this.state.priority === true ? 1 : 0})

        fetch('/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "orderNumber=" + this.state.orderNumber + "&title=" + this.state.title + "&company=" + this.state.company +
            "&date=" + this.state.date + "&status=" + this.state.status + "&columnId=" + this.state.columnId + "&priority=" + this.state.priority
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
            this.setState({ showModul: false })
            this.setState({ orderNumber: "" })
            this.setState({ title: "" })
            this.setState({ company: "" })
            this.setState({ date: "" })
            this.setState({ status: "normal" })
            this.setState({ columnId: "" })
            this.setState({ priority: "" })
        }).catch(error =>   {
            console.log(error)
        })
    }

    updatePriority = (id, priority) => {
        priority = priority === true ? 1 : 0

        fetch('/orders/priority', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "priority=" + priority + "&id=" + id
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
        }).catch(error =>   {
            console.log(error)
        })
    }

    updateStatus = (id, status) => {
        status = status === "good" ? "normal" : status === "normal" ? "bad" : "good"

        fetch('/orders/status', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "status=" + status + "&id=" + id
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
            this.getOrders()
        }).catch(error =>   {
            console.log(error)
        })
    }
}

/*

{
                            this.state.orders.map( (order) =>  {
                                return ( 
                                    <Order order={order} updateStatus={this.updateStatus.bind(this)} />
                                )
                            })
                        }
 */


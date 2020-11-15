import React, { Component } from 'react'
import { Navbar } from '../components/Navbar'
import "../public/style.css"
import  qtechgroup from '../public/qtechgroup.png'
import { Stack, initializeIcons, Toggle, Modal, StackItem, DetailsList, SelectionMode, IconButton, DatePicker } from 'office-ui-fabric-react';
import { TextField} from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { StatusCircle } from '../components/statusCircle'
import { switchStatus } from '../constants/index'

export class EditOrder extends Component {
    
    _detailListColumns = [
        { 
            key: 'priorityColumn', 
            name: 'Prioritet', 
            fieldName: 'priority', 
            minWidth: 50, 
            maxWidth: 100, 
            onRender: (item) => { return <Toggle defaultChecked={item.priority === 1 ? true : false} onChange={(e, checked) => { this.updatePriority(item.id, checked)} } /> }
        },
        { 
            key: 'orderNrColumn',
            name: 'Order nr', 
            fieldName: 'orderNumber', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'companyColumn',
            name: 'Leverantör', 
            fieldName: 'company', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'titleColumn',
            name: 'Beskrivning', 
            fieldName: 'title', 
            minWidth: 100, 
            maxWidth: 200,
            height:200,
            isResizable: true
        },
        {
            key: 'dateColumn',
            name: 'Datum', 
            fieldName: 'date', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'statusColumn',
            name: 'Status', 
            fieldName: 'status', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true,
            onRender: (item) => { return <StatusCircle status={item.status} id={item.id} updateStatus={this.updateStatus.bind(this)} />}
        },
        {
            key: 'updateProject',
            name: 'Redigera',
            fieldName: 'Redigera',
            minWidth: 80,
            maxWidth: 100,
            onRender: (item) => {return <IconButton iconProps={{ iconName: 'Edit'}} title="Redigera" onClick={ () => { this.openEditOrder(item) }} />}

        },
        {
            key: 'deleteProject',
            name: 'Radera Projekt',
            fieldName: 'Radera',
            minWidth: 80, 
            maxWidth: 100, 
            isResizable: true,
            onRender: (item) => {return <IconButton iconProps={{ iconName: 'Delete'}} title="Radera" onClick = { () => { this.deleteOrder(item.id) }} />        }
        }
    ];

    constructor(props) {
        super(props)
        initializeIcons()

        this.state = {
            users: [],
            orders: [],
            showModul: false,
            orderNumber: "",
            company: "",
            title: "",
            date: "",
            status: "normal",
            columnId: 0,
            priority: false,
        }

        this.loadUsers()
        this.getOrders()
    }


    render() {
        console.log("render?")
        return (
            <div className = "header">
                <Navbar users={this.state.users} />
                <StackItem className = "Dashboard_Titles">
                    <Text variant={'xxLarge'}>  ORDER & INKÖP</Text>
                </StackItem>
                <div>
                    <PrimaryButton text="Skapa order" onClick = { () => { this.setState({ showModul: true }) }} style={{marginTop: "10px"}} />
                    <Stack>
                        <DetailsList
                            items={ this.state.orders }
                            columns={this._detailListColumns}
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
                                    <DatePicker 
                                        label="Order datum"
                                        className="TextField"
                                        onSelectDate={ (date) => this.setOrderDate(date)}
                                    />
                                    <div style={{padding: "10px"}}> Status
                                        <StatusCircle status={this.state.status} updateStatus={(id, status) => {this.setState({ status: switchStatus(status)})}} />
                                    </div>
                                    <div style={{padding: "10px"}}> Prioriterad
                                        <Toggle defaultChecked={this.state.priority} onChange={(e, checked) => { this.setState({ priority: checked }) } } />
                                    </div>
                                    <br />
                                    {       
                                        this.state.orders.filter( o => o.orderNumber == this.state.orderNumber).length > 0 ? 
                                            ( <PrimaryButton text="Uppdatera order" onClick = { () => this.updateOrder(this.state.id)} />) :
                                            ( <PrimaryButton text="Skapa order" onClick = { () => this.createOrder()} />) 
                                               
                                        
                                    }
                                </form>
                            </Modal>
                            )
                        }
                    </Stack>
                </div>
            </div>
        )
    }

    setOrderDate = (pickedDate) => {
        let newDate = `${pickedDate.getMonth() + 1}/${pickedDate.getDate()}/${pickedDate.getFullYear()}`
        //console.log(newDate)
        this.setState({date: newDate})
    } 

    loadUsers = () => {
        fetch('/users')
        .then(Response => Response.json())
        .then(res => {
            console.log(res)
            this.setState({users: [...res.users]})
        }).catch( error => {
            console.log("error: ", error)
        })
    }

    getOrders = () => {
        fetch("/orders")
        .then( res => res.json())
        .then( data => {
            console.log(data.orders)
            this.setState({orders: [...data.orders]})
            
        })
        .catch( error => {
            console.error("error fetching orders: ", error)
        })
    }

    createOrder = () => {

        fetch('/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderNumber: this.state.orderNumber,
                title: this.state.title,
                company: this.state.company,
                date: this.state.date,
                status: this.state.status,
                columnId: this.state.columnId,
                priority: this.state.priority
            })
        })
        .then( Response => Response.json())
        .then( res =>    {
            console.log(res)
            this.getOrders();
            this.setState({ showModul: false, orderNumber:"", title:"", company:"", date:"", status:"normal", columnId:"", priority: false })
      
        }).catch( error => {
            console.log(error)
        })
    }

    updateOrder = (id) => {
        console.log("update order: ", this.state.date)
        fetch('/orders', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                orderNumber: this.state.orderNumber,
                title: this.state.title,
                company: this.state.company,
                date: this.state.date,
                status: this.state.status,
                columnId: this.state.columnId,
                priority: this.state.priority
            })
        })
        .then( Response => Response.json())
        .then( res =>    {
            console.log(res)
            this.getOrders();
            this.setState({ showModul: false, orderNumber:"", title:"", company:"", date:"", status:"normal", columnId:"", priority: false })
      
        }).catch( error => {
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

    openEditOrder = (order) => {
       
        this.setState({
            id: order.id,
            showModul: true,
            title: order.title,
            company: order.company,
            orderNumber: order.orderNumber,
            date: order.date,
            status: order.status,
            checked: order.checked
        })
    }

    deleteOrder = (id) => {

        fetch('/orders', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "id=" + id
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


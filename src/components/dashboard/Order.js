import React, { Component } from 'react'

export class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ordersData: []
        }

        this.getOrders()
    }


    getOrders = () => {
        fetch("/orders", {
            method:'GET',
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then( res => { console.log(res.status); return res.json()})
        .then( data => {
            console.log(data)
            this.setState({ordersData: [...data.orders]})
        })
        .catch( error => {
            console.error("error fetching orders: ", error)
        })
    }


    render() {
        return (
            this.state.ordersData.map( (order) => { return <p>{order.company + order.title + order.date}</p> })
        )
    }
}

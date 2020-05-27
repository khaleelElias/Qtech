import React, { Component } from 'react'
import { Persona, PersonaSize,  Text, divProperties, Stack, DefaultButton, personaSize, StackItem } from 'office-ui-fabric-react'


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
    redirectFunc = () =>  {
        this.props.history.push('/EditOrder')
      }


    render() {
        
        return (
            <div>
                
                <Stack >
                    <Stack horizontal className = "Dashboard_Titles">
                        <DefaultButton   text="ORDER/INKÖP" onClick={() => {this.redirectFunc()}} />
                        <Persona size={PersonaSize.size40}/>
                    </Stack>
                    <Text style = {{textAlign: "center", fontFamily: "Times"}}>Här kan ni se alla våra sneakers som vi har inne i butiken. Sneakers-modeller från Nike Air Max 90, Nike Air Force 1, Nike Air Max 270, Nike VaporMax, adidas Superstar, adidas Stan Smith, adidas Continental 80, FILA Disruptor, Converse All Star, Reebok Classic Leather</Text>
                   
                
                </Stack>
                <Stack>
                    { this.state.ordersData.map( (order) => 
                        { 
                            return (order.company + order.title + order.date)
                        }
                        )
                    } 
                </Stack>  
            </div>
        )
    }
}

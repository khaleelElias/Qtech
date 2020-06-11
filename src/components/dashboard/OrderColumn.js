import React, { Component } from 'react'
import { Persona, PersonaSize,  Text, divProperties, Stack, DefaultButton, personaSize, StackItem } from 'office-ui-fabric-react'
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { statusOfField, switchStatusColor } from '../../constants/index'
import { initializeIcons  } from 'office-ui-fabric-react';       





const iconClass = mergeStyles({
    fontSize: 40,
    height: 40,
    width: 40,
    margin: '0 25px',
    color: "#27AE60"
  });
  const classNames = mergeStyleSets({
    deepSkyBlue: [{ color: 'gray' }, iconClass],
    greenYellow: [{ color: 'greenyellow' }, iconClass],
    salmon: [{ color: 'salmon' }, iconClass],
  });

export class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }
        console.log("Order is run?")

        this.getOrders()
        initializeIcons()
    }

    getOrders = () => {
        fetch("/orders?priority=1")
        .then( res => res.json())
        .then( data => {
            console.log("fetching orders to column: ", data)
            this.setState({orders: [...data.orders]})
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
            <div >
                <Stack >
                    <Stack horizontal  gap = {8} className = "Dashboard_Titles">
                        <FontIcon className={classNames.deepSkyBlue}  iconName="ReservationOrders"/>
                        <DefaultButton   text="ORDER/INKÖP" onClick={() => {this.redirectFunc()}} />
                        <Persona size={PersonaSize.size40}/>
                    </Stack>                
                </Stack>
                
                    <ul >
                        {
                            this.state.orders.map( (order) => { 
                                return (
                                   <Stack horizontal className='ulForOrder' gap={10} style = {{margin:10}}>
                                       <Stack.Item align="center">
                                       <FontIcon 
                                            iconName={"LocationDot"}
                                            style={{color: statusOfField[order.status]}}
                                       />
                                       </Stack.Item>
                                       <Stack.Item align="center">
                                       <Text> {`${order.orderNumber} ${order.company} ${order.title} ${order.date}`} </Text>
                                       </Stack.Item>
                                       <Stack.Item align="center">
                                       { order.priority ? (
                                            <FontIcon
                                                iconName={"FavoriteStarFill"}
                                                style={{color: "yellow"}} 
                                            />
                                       ) : null}
                                       </Stack.Item>
                                   </Stack>
                                )
                            })
                        } 
                    </ul>
            </div>
        )
    }
}

/*
 <div style={{color: statusOfField[order.status], paddingBlockEnd:'10px'}}> 
                                        <span style={{borderRadius:'50%', backgroundColor:'black', width:5, height:5, display:'inline-block'}}/>
                                            {`${order.orderNumber} ${order.company} ${order.title} ${order.date} ${order.priority ? '*' : null}`}
                                    </div> 
*/
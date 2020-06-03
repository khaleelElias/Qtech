import React, { Component } from 'react'
import { Persona, PersonaSize,  Text, divProperties, Stack, DefaultButton, personaSize, StackItem } from 'office-ui-fabric-react'
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { orderStatus } from '../../constants/index'




const iconClass = mergeStyles({
    fontSize: 40,
    height: 40,
    width: 40,
    margin: '0 25px',
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

        this.getOrders()
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
                
                    <ul className ="styleOrderColumn">
                        {
                            this.state.orders.map( (order) => { 
                                return ( <li className="orderfahed" style={{color:orderStatus[order.status]}}> {`${order.orderNumber} ${order.company} ${order.title} ${order.date} ${order.priority ? '*' : null}`} </li> )
                            })
                        } 
                    </ul>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { Persona, PersonaSize,  Text, divProperties, Stack, DefaultButton, personaSize, StackItem } from 'office-ui-fabric-react'
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { statusOfField, switchStatusColor } from '../../constants/index'
import { initializeIcons  } from 'office-ui-fabric-react';  
import { StatusCircle } from '../statusCircle'






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
            orders: [],
            checks: []
        }
        console.log("Order is run?")

        this.getOrders()
        this.getChecks()
        initializeIcons()
    }

    getChecks = () => {
        fetch("/checks?columnId=2")
        .then( res => res.json())
        .then( data => {
            console.log("fetching checks to column: ", data)
            this.setState({checks: [...data.checks]})
        })
        .catch( error => {
            console.error("error fetching checks: ", error)
        })
    }

    updateStatus = (id, status) => {
        status = status === "good" ? "normal" : status === "normal" ? "bad" : "good"

        fetch('/checks/status', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "status=" + status + "&id=" + id
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
            this.getChecks()
        }).catch(error =>   {
            console.log(error)
        })
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
<<<<<<< HEAD
            <Stack>
                <Stack horizontalAlign="center">
=======
            <div >
                <Stack >
>>>>>>> 73272b9c6eb012baab254fa84e4c45e8e6cd27b1
                    <Stack horizontal  gap = {8} className = "Dashboard_Titles">
                        <FontIcon className={classNames.deepSkyBlue}  iconName="ReservationOrders"/>
                        <DefaultButton   text="ORDER/INKÖP" onClick={() => {this.redirectFunc()}} />
                        <Persona size={PersonaSize.size40}/>
                    </Stack>                
               
                    <Stack className = "solidListStyle">
                        {
                            this.state.checks.map((check) =>{
                                return(
                                    <Stack horizontal className = "solidList">
                                        {check.title}
                                        <StatusCircle status={check.status} id={check.id} updateStatus={this.updateStatus.bind(this)} />
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                </Stack>
                <ul className= "ulStyle">
                {
                    this.state.orders.map( (order) => { 
                        const title = `${order.orderNumber} ${order.company} `

                        return ( 
                            <li  style={{borderLeft:`5px solid ${statusOfField[order.status]}`}}> 
                                <a className="listItem"> { `${title.slice(0, 40)} ${ title.length > 40 ?  "..." : ""}` }
                                    <div className="descriptionOfListItem">
                                        <p style={{textAlign:'center'}}>{order.orderNumber}</p>
                                        <p>{order.company}</p>
                                        <p>{order.date}</p>
                                        <p>{order.message}</p>

                                    </div>
                                    { order.priority ? (
                                            <FontIcon
                                                iconName={"FavoriteStarFill"}
                                                style={{color: "yellow"}} 
                                            />
                                    ) : null}
                                </a>
                            </li> 
                        )
                    })
                }
                </ul>
            </Stack>
        )
    }
}

/*
 <div style={{color: statusOfField[order.status], paddingBlockEnd:'10px'}}> 
                                        <span style={{borderRadius:'50%', backgroundColor:'black', width:5, height:5, display:'inline-block'}}/>
                                            {`${order.orderNumber} ${order.company} ${order.title} ${order.date} ${order.priority ? '*' : null}`}
                                    </div> 


<Stack.Item align="center">
                                        <FontIcon 
                                                iconName={"LocationDot"}
                                                style={{color: statusOfField[order.status]}}
                                        />
                                        </Stack.Item>
                                        <Stack.Item align="center" >
                                        <Text> {`${order.orderNumber} ${order.company} ${order.title} ${order.date}`} </Text>
                                        </Stack.Item>
                                        <Stack.Item align="center">
                                        { order.priority ? (
                                                <FontIcon
                                                    iconName={"FavoriteStarFill"}
                                                    style={{color: "yellow"}} 
                                                />
                                        ) : null}
                                        </Stack.Item>*/
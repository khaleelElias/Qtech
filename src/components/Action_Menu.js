
import React, { Component } from 'react'
import { CommandBarButton, Button, Stack , Text} from 'office-ui-fabric-react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import '../public/style.css'
import { initializeIcons  } from 'office-ui-fabric-react';
import { Modal } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {userStatusOptions, createColumnOptions} from '../constants/index'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export class Action_Menu extends Component {   
  constructor(props) {
    super(props)

    initializeIcons()

    this.state = {
        showModul: false,
        showModul2: false, 
        username:"",
        status: "good",
        title :"",
        message: "",
        supervisor:"",
        type: "",
        sendingReq: false
    }
  }

  createUser = (username, status) => {
    fetch('/users', {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/x-www-form-urlencoded'      
      },
      body: "username=" + username + "&status=" + status
    })
    .then(Response => Response.json())
    .then( (res) => {
      this.props.reloadData()
      this.setState({showModul:false});
    }).catch(error => {
      console.log("error creating user", error)
    })
  }
  createColumn = () => {
    this.setState({sendingReq: true})
    fetch('/columns', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: this.state.title,
            supervisor:this.state.supervisor,
            type: this.state.type,
            message: this.state.message,
        })
    })
    .then( Response => Response.json())
    .then( res =>    {
        this.setState({sendingReq:false, showModul2:false})
        this.reloadPage();
    }).catch( error => {
        console.log(error)
    })
}
  redirectFunc = () =>  {
    this.props.history.push('/CreateColumn')
  }

  reloadPage = () =>  {
    window.location.reload(false);
  }
   
  subMenuProps = {
    items: [
      {
        key: 'Aktivitet',
        text: 'Aktivitet',
        iconProps: { iconName: 'AccountActivity' },
        onClick: () => this.setState({showModul2: true})
      },
      {
        key: 'Användare',
        text: 'Användare',
        iconProps: { iconName: 'AddFriend' },
        onClick: () => this.setState({showModul: true})
      }
    ],
  }
   

  render() {
      return (
          <div>
            <CommandBarButton 
              style={{margin:10, padding:10}}
              items={this._items}
              text={"Lägg till"}
              iconProps={{iconName: "Add"}}
              menuProps={this.subMenuProps}  
            />
            
            <Modal className = "Modal2"
                isOpen={this.state.showModul2}
                onDismiss={() => this.setState({showModul2: !this.state.showModul2}) }
                isBlocking={false}
            >
            <form className = "Modal_New_User">
              <h2>Lägg till ny Aktivitet</h2>
              <TextField label="Rubrik" value={this.state.title} onChange={ (e) => { this.setState({title: e.target.value})}}/>
              <TextField label="Innehåll" multiline autoAdjustclassNamet  className ="TextField" value={this.state.message} onChange={ (e) => { this.setState({message: e.target.value})}}/>
   
              <Dropdown 
                className ="Dropdown"
                label="Välj sida?"
                placeholder="Välj ett alternativ"
                onChange={ ({}, item) => this.setState({type:item.key}) }
                options={createColumnOptions}
                />
              <PrimaryButton text={this.state.sendingReq ? <Spinner size={SpinnerSize.small}/>:"lägg till"} onClick = { () => { this.createColumn(this.state.title, this.state.message, this.state.type); this.props.reloadData();}} style={{marginTop: "10px"}} />
            </form>
           </Modal>
            <Modal className = "Modal"
                isOpen={this.state.showModul}
                onDismiss={() => this.setState({showModul: !this.state.showModul}) }
                isBlocking={false}
            >
            <form className = "Modal_New_User">
              <h2>Lägg till ny användare</h2>
              <TextField label="Förnamn & efternamn" className ="TextField" value={this.state.username} onChange={ (e) => { this.setState({username: e.target.value})}}/>
              <Dropdown 
                className ="Dropdown"
                label="Hur mår du idag?"
                placeholder="Välj ett alternativ"
                onChange={ ({}, item) => this.setState({status:item.key}) }
                options={userStatusOptions}
                />

              <PrimaryButton text="Lägg till" onClick = { () => { this.createUser(this.state.username, this.state.status); this.props.reloadData();}} style={{marginTop: "10px"}} />
            </form>

           </Modal>
          </div>
      )
  }
}

import React, { Component } from 'react'
import { ActionButton, IIconProps, CommandBar, CommandBarButton } from 'office-ui-fabric-react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import './style.css'
import { initializeIcons  } from 'office-ui-fabric-react';
import { Modal } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {statusOptions} from '../constants/index'

import { useHistory } from "react-router-dom";


export class Sub_Menu extends Component {    
  constructor(props) {
      super(props)
      initializeIcons()

      this.state = {
          showModul: false, 
          username:"",
          status: "good"
      }
  }

  createUser = (username, status) => {
    fetch('/users/create', {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username,
            status
            
        })
    })
    .then(Response => Response.json())
    .then( () => {
        this.setState({showModul:false});
        this.props()
      }).catch(error => {
        console.log("error creating user", error)
    })
}
  
   
  subMenuProps = {
    items: [
      {
        key: 'Projekt',
        text: 'Projekt',
        iconProps: { iconName: 'ProjectLogoFill16' }
      },
      {
        key: 'Aktivitet',
        text: 'Aktivitet',
        iconProps: { iconName: 'AccountActivity' },
      },
      {
        key: 'Användare',
        text: 'Användare',
        iconProps: { iconName: 'AddFriend' },
        onClick: () => { this.setState({showModul: true})}
      }
    ],
  }

  render() {
    if(this.state.showModul)
      console.log("render")
    else
      console.log("false")
      return (
          <div>
            
           
            <CommandBarButton 
              style={{margin:10, padding:10}}
              items={this._items}
              text={"New"}
              iconProps={{iconName: "Add"}}
              menuProps={this.subMenuProps}  
            />
            
            <Modal className = "Modal"
                isOpen={this.state.showModul}
                onDismiss={() => {this.setState({showModul: !this.state.showModul})}}
                isBlocking={false}
            >
            <form className = "Modal_New_User">
              <h2>Lägg till ny användare</h2>
              <TextField label="Förnamn och efternamn" className ="TextField" value={this.state.username} onChange={ (e) => { this.setState({username: e.target.value})}}/>
              <Dropdown 
                className ="Dropdown"
                label="Hur mår du idag?"
                placeholder="Select an option"
                onChange={ ({}, item) => this.setState({status:item.key}) }

                options={statusOptions}
                />

              <PrimaryButton text="Lägg till" onClick = { () => { this.createUser(this.state.username, this.state.status)}} style={{marginTop: "10px"}} />
            </form>

           </Modal>
            
            
          </div>
      )
  }
}
function _alertClicked() {
  alert('Clicked');
}


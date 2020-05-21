import React, { Component } from 'react';
import { withRouter } from "react-router-dom"; 

export class Create_Column extends Component {
    constructor(props) {
        super(props)
        console.log("createColumn: ", props)

        this.state = {
            title: String,
            message: String,
            supervisor: 1,
            users: []
        }

        this.loadUsers()
        this.createColumn = this.createColumn.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.createColumn}>
                    <label for="fname">Titel:</label><br/>
                    <input type="text" value={this.state.title} onChange={ (e) => {this.setState({title: e.target.value}) }} placeholder="Title" /> 
                    <br/>
                    <label for="lname">Innehåll:</label><br/>
                    <input type="text" value={this.state.message} onChange={ (e) => {this.setState({message: e.target.value}) }} placeholder="Innehåll" />
                    <select onChange={(e) => this.setState({ supervisor: e.target.value})}>
                        {this.state.users.map((user) => <option key={user.key} value={user.key}>{user.value}</option>)}
                    </select>
                    <label for="supervisor"> {this.state.supervisor} </label>
                    <br/>

                    <input type="submit" value="Submit"/>
                    
                </form>
            </div>
        );
    }

    createColumn(e) {
        e.preventDefault();
        fetch('/columns', {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "title=" + this.state.title + "&message=" + this.state.message + "&supervisor=" + this.state.supervisor
        }).then(response => 
            response.json()
        ).then(res => {
            console.log(res)
            //länk till startsida 
            this.props.history.push('/')
        
        }).catch(error => {
            console.log(error)
        });
    }

    loadUsers = () => {
        fetch('/users')
        .then(Response => Response.json())
        .then(res => {
            console.log(res)
            
            let usersFromApi = res.users.map( user =>   {
                return {key: user.id, value: user.username }
            });

            this.setState({ users: [{key: '', value: '(Välj en ansvarig!)'}].concat(usersFromApi)})
            console.log(this.state.users)

        }).catch( error => {
            console.log("error: ", error)
        })
    }

}


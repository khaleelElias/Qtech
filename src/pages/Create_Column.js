import React, { Component } from 'react';
import '../public/style.css'

export class Create_Column extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: String,
            message: String,
            supervisor: -1,
            users: []
        }

        this.loadUsers()
        this.createColumn = this.createColumn.bind(this);
    }

    render() {
        return (
            <div className='columnStyle'>
                <h2 className='h2'> Projekt </h2>
                <hr className='hr'/>
                <form onSubmit={this.createColumn}>
                    <label for="fname">Titel:</label><br/>
                    <input type="text" value={this.state.title} onChange={ (e) => {this.setState({title: e.target.value}) }} placeholder="Title" /> <br/>
                    
                    <label for="lname">Innehåll:</label><br/>
                    <textarea type="text" value={this.state.message} onChange={ (e) => {this.setState({message: e.target.value}) }} placeholder="Innehåll" /><br/> 
                    <select onChange={(e) => this.setState({ supervisor: e.target.value})}>
                        {this.state.users.map((user) => <option key={user.key} value={user.key}>{user.value}</option>)}
                    </select>
                    <label for="supervisor"> {this.state.supervisor} </label><br/>
                    <br/>
                    <input type="button" value="Cancel" onClick={ () => { this.props.history.push('/')} }/>
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
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "title=" + this.state.title + "&message=" + this.state.message + "&supervisor=" + this.state.supervisor
            + "&type=1"
        }).then(response => 
            response.json()
        ).then(res => {
            this.props.history.push('/')
        }).catch(error => {
            console.log(error)
        });
    }

    loadUsers = () => {
        fetch('/users')
        .then(Response => Response.json())
        .then(res => {
            let usersFromApi = res.users.map( user =>   {
                return {key: user.id, value: user.username }
            });

            this.setState({ users: [{key: '', value: '(Välj en ansvarig!)'}].concat(usersFromApi)})
        }).catch( error => {
            console.log("error: ", error)
        })
    }
}


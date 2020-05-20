import React, { Component } from 'react'
import { TextField } from 'office-ui-fabric-react';

export class Create_Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: String,
            message: String,
            supervisor: 1,
        }

        this.createColumn = this.createColumn.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.createColumn} >
                    <label for="fname">Titel:</label><br/>
                    <input type="text" value={this.state.title} onChange={ (e) => {this.setState({title: e.target.value}) }} placeholder="Title" /> 
                    <br/>
                    <label for="lname">Innehåll:</label><br/>
                    <input type="text" value={this.state.message} onChange={ (e) => {this.setState({message: e.target.value}) }} placeholder="Innehåll" />
                    <input type="hidden" name value="1"/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

    createColumn(e) {
        e.preventDefault();
        console.log("createPost!!")

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
            if(res && res.data){
                this.setState({ users: [...this.state.users, ...res.data] })
            }
        }).catch(error => {
            console.log(error)
        });
    }

}


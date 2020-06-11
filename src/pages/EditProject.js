import React, { Component } from 'react'
import { Navbar } from '../components/Navbar'
import "../public/style.css"
import  qtechgroup from '../public/qtechgroup.png'
import { Stack, initializeIcons, Toggle, Modal, StackItem, DetailsList, SelectionMode } from 'office-ui-fabric-react';
import { TextField} from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { StatusCircle } from '../components/statusCircle'
import { switchStatus } from '../constants/index'


export class EditProject extends Component {
    
    _detailListColumns = [
        { 
            key: 'priorityColumn', 
            name: 'priority', 
            fieldName: 'priority', 
            minWidth: 50, 
            maxWidth: 100, 
            onRender: (item) => { return <Toggle defaultChecked={item.priority === 1 ? true : false} onChange={(e, checked) => { this.updatePriority(item.id, checked)} } /> }
        },
        { 
            key: 'projectNrColumn',
            name: 'project number', 
            fieldName: 'projectNumber', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'companyColumn',
            name: 'company', 
            fieldName: 'company', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'dateColumn',
            name: 'date', 
            fieldName: 'date', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true
        },
        {
            key: 'messageColumn',
            name: 'message',
            fieldName: 'message',
            maxWidth: 200,
            isResizable: true
        },
        {
            key: 'statusColumn',
            name: 'status', 
            fieldName: 'status', 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true,
            onRender: (item) => { return <StatusCircle status={item.status} id={item.id} updateStatus={this.updateStatus.bind(this)} />}
        },
        {
            key: 'deleteProject',
            name: 'delete',
            fieldName: 'Radera',
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true,
            onRender: (item) => {return <PrimaryButton text="Radera" onClick = { () => { this.deleteProject(item.id) }} style={{marginTop: "10px"}} />        }
        }
    ];

    constructor(props) {
        super(props)
        initializeIcons()

        this.state = {
            users: [],
            projects: [],
            showModul: false,
            projectNumber: "",
            company: "",
            date: "",
            status: "normal",
            message: "",
            priority: false,
        }

        this.loadUsers()
        this.getProjects()
    }


    render() {
        console.log("render?")
        return (
            <div className= "header">
                <Navbar users={this.state.users} />
                <StackItem className = "Dashboard_Titles">
                    <Text  variant={'xxLarge'}>  Project</Text>
                </StackItem>
                <div>
                    <PrimaryButton text="Skapa project" onClick = { () => { this.setState({ showModul: true }) }} style={{marginTop: "10px"}} />
                    <Stack>
                        <DetailsList
                            items={ this.state.projects }
                            columns={this._detailListColumns}
                            setKey="set"
                            selectionMode={SelectionMode.none}
                        />
                        
                        {
                            this.state.showModul && (
                            <Modal className = "Modal"
                                isOpen={this.state.showModul}
                                onDismiss={() => this.setState({showModul: !this.state.showModul}) }
                                isBlocking={false}
                            >
                                <form className="Modal_New_User">
                                    <h2>Lägg till ny project</h2>
                                    <TextField label="Project nummer" className ="TextField" value={this.state.projectNumber} onChange={(e) => {this.setState({ projectNumber: e.target.value}) }}/>
                                    <TextField label="Project company" className ="TextField" value={this.state.company} onChange={ (e) => { this.setState({company: e.target.value}) }}/>
                                    <TextField label="Project message" className ="TextField" value={this.state.message} onChange={ (e) => { this.setState({ message: e.target.value}) }}/>
                                    <TextField label="Project datum" className ="TextField" value={this.state.date} onChange={ (e) => { this.setState({date: e.target.value}) }}/>
                                    <div style={{padding: "10px"}}> Status
                                        <StatusCircle status={this.state.status} updateStatus={(id, status) => { this.setState({ status: switchStatus(status)})}} />
                                    </div>
                                    <div style={{padding: "10px"}}> Prioriterad
                                        <Toggle defaultChecked={this.state.priority} onChange={(e, checked) => { this.setState({ priority: checked }) } } />
                                    </div>
                                    <PrimaryButton text="Skapa project" onClick = { () => this.createProject()} style={{marginTop: "10px"}} />
                                </form>
                            </Modal>
                            )
                        }
                    </Stack>
                </div>
            </div>
        )
    }

    loadUsers = () => {
        fetch('/users')
        .then(Response => Response.json())
        .then(res => {
            console.log(res)
            this.setState({users: [...res.users]})
        }).catch( error => {
            console.log("error: ", error)
        })
    }

    getProjects = () => {

        fetch("/projects")
        .then( res => res.json())
        .then( data => {
            this.setState({projects: [...data.projects]})

        })
        .catch( error => {
            console.error("error fetching projects: ", error)
        })
    }

    createProject = () => {

        fetch('/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectNumber: this.state.projectNumber,
                company: this.state.company,
                date: this.state.date,
                status: this.state.status,
                message: this.state.message,
                priority: this.state.priority
            })
        })
        .then( Response => Response.json())
        .then( res =>    {
            console.log(res)
            this.getProjects();
            this.setState({ showModul: false, projectNumber:"", message: "", company:"", date:"", status:"normal", columnId:"", priority: false })
      
        }).catch( error => {
            console.log(error)
        })
    }

    updatePriority = (id, priority) => {
        priority = priority === true ? 1 : 0

        fetch('/projects/priority', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                priority: priority,
                id: id
            })
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
        }).catch(error =>   {
            console.log(error)
        })
    }

    updateStatus = (id, status) => {
        status = status === "good" ? "normal" : status === "normal" ? "bad" : "good"

        fetch('/projects/status', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "status=" + status + "&id=" + id
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
            this.getProjects()
        }).catch(error =>   {
            console.log(error)
        })
    }

    deleteProject = (id) => {

        fetch('/projects', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "id=" + id
        })
        .then(Response => Response.json())
        .then(res =>    {
            console.log(res)
            this.getProjects()
        }).catch(error =>   {
            console.log(error)
        })
    }
    
}
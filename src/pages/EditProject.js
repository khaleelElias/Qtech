import React, { Component } from 'react'
import { Navbar } from '../components/Navbar'
import '../public/style.css'
import  qtechgroup from '../public/qtechgroup.png'
import { Stack, initializeIcons, Toggle, Modal, StackItem, DetailsList, SelectionMode, DatePicker } from 'office-ui-fabric-react';
import { TextField} from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { StatusCircle } from '../components/statusCircle'
import { switchStatus } from '../constants/index'

export class EditProject extends Component {
    
    _detailListColumns = [
        {
            key: 'priorityColumn', 
            name: 'Prioritet', 
            fieldName: 'priority', 
            minWidth: 50,
            maxWidth: 55, 
            isResizable: true,
            onRender: (item) => { return <Toggle defaultChecked={item.priority === 1 ? true : false} onChange={(e, checked) => { this.updatePriority(item.id, checked)} } /> }
        },
        { 
            key: 'projectNrColumn',
            name: 'Projekt nr', 
            fieldName: 'projectNumber', 
            minWidth: 40, 
            width: 50,
            maxWidth: 100,  
            isResizable: true
        },
        {
            key: 'companyColumn',
            name: 'Företag', 
            fieldName: 'company', 
            minWidth: 100, 
            maxWidth: 100, 
            isResizable: true
        },
        {
            key: 'dateColumn',
            name: 'Datum', 
            fieldName: 'date', 
            minWidth: 40, 
            width: 50,
            maxWidth: 60, 
            isResizable: true
        },
        {
            key: 'messageColumn',
            name: 'Beskrivning',
            fieldName: 'message',
            minWidth: 150,
            maxWidth: 300,
            isResizable: true,
            onRender: (item) => {return <span style={{ whiteSpace: "initial" }}> {item.message} </span>}
        },
        {
            key: 'statusColumn',
            name: 'Status', 
            fieldName: 'status', 
            minWidth: 40, 
            maxWidth: 60,
            onRender: (item) => { return <StatusCircle status={item.status} id={item.id} updateStatus={this.updateStatus.bind(this)} />}
        },
        {
            key: 'updateProject',
            name: 'Redigera',
            fieldName: 'Redigera',
            minWidth: 80,
            maxWidth: 100,
            onRender: (item) => {return <IconButton iconProps={{ iconName: 'Edit'}} title="Redigera" onClick={ () => { this.openEditProject(item) }} />}

        },
        {
            key: 'deleteProject',
            name: 'Radera',
            fieldName: 'Radera',
            minWidth: 80, 
            maxWidth: 100, 
            isResizable: true,
            onRender: (item) => {return <IconButton iconProps={{ iconName: 'Delete'}} title="Radera" onClick = { () => { this.deleteProject(item.id) }} />        }
        }
    ];

    _checkList= [
        {
            key: 'title',
            name: 'Meddelande',
            isResizable: true,
            onRender: (item) => {return <span style={{ whiteSpace: "initial" }}> {item.title} </span>}
        },
        {
            key: 'deleteCheck',
            name: 'Radera',
            fieldName: 'Radera',
            minWidth: 80,
            maxWidth: 100, 
            isResizable: true,
            onRender: (item) => { return <PrimaryButton text="Radera" onClick = { () => { this.deleteCheck(item.id) }} /> }
        }
    ];

    constructor(props) {
        super(props)
        initializeIcons()

        this.state = {
            users: [],
            projects: [],
            checks: [],
            checkTitle: "",
            showCheckModul: false,
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
        this.getChecks()
    }


    render() {
        console.log("render?")
        return (
            <div className= "header">
                <Navbar users={this.state.users} />
                <StackItem className = "Dashboard_Titles">
                    <Text  variant={'xxLarge'}>  Projekt</Text>
                </StackItem>
                <div>
                    <PrimaryButton text="Skapa project" onClick = { () => { this.setState({ showModul: true }) }} style={{marginTop: "10px"}} />
                    <PrimaryButton text="Skapa check" onClick = { () => { this.setState({ showCheckModul: true }) }} style={{marginTop: "10px", float: "right"}} />
                    <Stack grow gap={1} horizontal>
                        <DetailsList
                            className="detaillist-left"
                            items={ this.state.projects }
                            columns={this._detailListColumns}
                            setKey="set"
                            selectionMode={SelectionMode.none}
                        />
                        <DetailsList
                            className="detaillist-right"
                            items={ this.state.checks }
                            columns={this._checkList}
                            setKey="set"
                            selectionMode={SelectionMode.none}
                        />
                    </Stack>
                    {
                            this.state.showModul && (
                            <Modal className = "Modal"
                                isOpen={this.state.showModul}
                                onDismiss={() => this.setState({showModul: !this.state.showModul}) }
                                isBlocking={false}
                            >
                                <form className="Modal_New_User">
                                    <h2>Lägg till ny Projekt</h2>
                                    <TextField label="Nummer" className ="TextField" value={this.state.projectNumber} onChange={(e) => {this.setState({ projectNumber: e.target.value}) }}/>
                                    <TextField label="Kund" className ="TextField" value={this.state.company} onChange={ (e) => { this.setState({company: e.target.value}) }}/>
                                    <TextField label="Anteckning" className ="TextField" value={this.state.message} onChange={ (e) => { this.setState({ message: e.target.value}) }}/>
                                    <DatePicker 
                                        label="Order datum"
                                        className="TextField"
                                        onSelectDate={ (date) => this.setProjectDate(date)}
                                    />
                                    <div style={{padding: "10px"}}> Status
                                        <StatusCircle status={this.state.status} updateStatus={(id, status) => { this.setState({ status: switchStatus(status)})}} />
                                    </div>
                                    <div style={{padding: "10px"}}> Prioriterad
                                        <Toggle defaultChecked={this.state.priority} onChange={(e, checked) => { this.setState({ priority: checked }) } } />
                                    </div>
                                    <PrimaryButton text="Project" onClick = { () => this.createProject()} style={{marginTop: "10px"}} />
                                </form>
                            </Modal>
                            )
                        }
                        {
                            this.state.showCheckModul && (
                            <Modal className = "Modal"
                                isOpen={this.state.showCheckModul}
                                onDismiss={() => this.setState({showCheckModul: !this.state.showModul}) }
                                isBlocking={false}
                            >
                                <form className="Modal_New_User">
                                    <h2>Lägg till ny check</h2>
                                    <TextField label="Meddelande" multiline autoAdjustHeight className ="TextField" value={this.state.checkTitle} onChange={(e) => {this.setState({ checkTitle: e.target.value}) }}/>
                                    <PrimaryButton  className = "PrimaryButton" text="Skapa check" onClick = { () => this.createCheck()} style={{marginTop: "10px"}} />
                                </form>
                            </Modal>
                            )
                        }
                        {
                            this.state.showEditModul && (
                            <Modal className = "Modal"
                                isOpen={this.state.showCheckModul}
                                onDismiss={() => this.setState({showCheckModul: !this.state.showModul}) }
                                isBlocking={false}
                            >
                            <form className="Modal_New_User">
                                <h2>Lägg till ny check</h2>
                                <TextField label="Meddelande" multiline autoAdjustHeight className ="TextField" value={this.state.checkTitle} onChange={(e) => {this.setState({ checkTitle: e.target.value}) }}/>
                                <PrimaryButton  className = "PrimaryButton" text="Skapa check" onClick = { () => this.createCheck()} style={{marginTop: "10px"}} />
                            </form>
                            </Modal>
                        )}
                </div>
            </div>
        )
    }

    setProjectDate = (pickedDate) => {
        let newDate = `${pickedDate.getMonth() + 1}/${pickedDate.getDate()}/${pickedDate.getFullYear()}`
        //console.log(newDate)
        this.setState({date: newDate})
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
    // Projects
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

    openEditProject = (project) => {
       
        this.setState({
            showModul: true,
            message: project.message,
            company: project.company,
            projectNumber: project.projectNumber,
            date: project.date,
            status: project.status,
            checked: project.checked
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

    //Checks
    getChecks = () => {
        fetch("/checks?columnId=3002")
        .then( res => res.json())
        .then( data => {
            this.setState({checks: [...data.checks]})
        })
        .catch( error => {
            console.error("error fetching projects: ", error)
        })
    }

    createCheck = () => {
        fetch('/checks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.checkTitle,
                columnId: 3002
            })
        })
        .then( Response => Response.json())
        .then( res =>    {
            console.log(res)
            this.getChecks();
            this.setState({ showCheckModul: false, checkTitle: ""})
        }).catch( error => {
            console.log(error)
        })
    }

    deleteCheck = (id) => {
        fetch('/checks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "id=" + id
        })
        .then(Response => Response.json())
        .then(res =>    {
            this.getChecks()
        }).catch(error =>   {
            console.log(error)
        })
    }
    
}
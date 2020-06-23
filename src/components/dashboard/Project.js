import React, { Component } from 'react'
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Persona, PersonaSize, Stack, DefaultButton, Check, StackItem } from 'office-ui-fabric-react'
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { statusOfField } from '../../constants';
import { initializeIcons  } from 'office-ui-fabric-react';       
import { StatusCircle } from '../statusCircle'
import { switchStatus } from '../../constants/index'


const iconClass = mergeStyles({
    fontSize: 40,
    height: 40,
    width: 40,
    margin: '0 25px',
    color: "#F1C40F"
  });
  const classNames = mergeStyleSets({
    deepSkyBlue: [{ color: 'gray' }, iconClass],
    greenYellow: [{ color: 'greenyellow' }, iconClass],
    salmon: [{ color: 'salmon' }, iconClass],
  });


export class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            checks: []
        }

        this.getProjects()
        this.getChecks()
        initializeIcons()
    }

    getChecks = () => {
        fetch("/checks?columnId=1")
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


    getProjects = () => {
        fetch("/projects?priority=1")
        .then( res => res.json())
        .then( data => {
            console.log("fetching Projects to column: ", data)
            this.setState({projects: [...data.projects]})
        })
        .catch( error => {
            console.error("error fetching projects: ", error)
        })
    }


    redirectFunc = () =>  {
        this.props.history.push('/EditProject')
    }


    render() {
        return (
            <Stack>
                
                 <Stack>
                    <Stack Stack horizontal   className = "Dashboard_Titles">
                        <FontIcon className={classNames.deepSkyBlue}  iconName="TextDocumentShared"/>
                        <DefaultButton  text="PROJEKT" onClick={() => {this.redirectFunc()}} />
                        <Persona size={PersonaSize.size40}/>
                    </Stack>
                    <Stack  className = "solidListStyle">
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
                    <Stack>
                    <ul className= "ulStyle">
                        {
                            this.state.projects.map( (project) => { 
                                const title = `${project.projectNumber} ${project.company} ${project.date}`
                                return (
                                    <li style={{borderLeft:`5px solid ${statusOfField[project.status]}`}}> 
                                        <a className="listItem"> { `${title.slice(0, 40)} ${ title.length > 40 ?  "..." : ""}` }
                                        <div className="descriptionOfListItem">
                                            <p style={{textAlign:'center'}}>{project.projectNumber}</p>
                                            <p>{project.company}</p>
                                            <p>{project.date}</p>
                                            <p>{project.message}</p>

                                        </div>
                                        { project.priority ? (
                                            <FontIcon
                                                iconName={"FavoriteStarFill"}
                                                style={{color: "yellow"}} 
                                            />
                                        ) : null} </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </Stack>
                </Stack>
            </Stack>
        )
    }
}

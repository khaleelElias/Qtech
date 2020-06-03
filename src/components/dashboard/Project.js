import React, { Component } from 'react'
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Persona, PersonaSize, Stack, DefaultButton } from 'office-ui-fabric-react'
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { statusOfField } from '../../constants';




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
            projects: []

        }

        this.getProjects()
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
                    <Stack Stack horizontal  gap = {8} className = "Dashboard_Titles">
                        <FontIcon className={classNames.deepSkyBlue}  iconName="TextDocumentShared"/>
                        <DefaultButton  text="Projekt" onClick={() => {this.redirectFunc()}} />
                        <Persona size={PersonaSize.size40}/>
                    </Stack>
                    <ul style={{alignSelf:'center'}}>
                        {
                            this.state.projects.map( (project) => { 
                                return ( <li style={{color:statusOfField[project.status]}}> {`${project.projectNumber} ${project.company} ${project.date} ${project.message} ${project.priority ? '*' : null}`} </li> )
                            })
                        }
                    </ul>
                </Stack>
            </Stack>
        )
    }
}

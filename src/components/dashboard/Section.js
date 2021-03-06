import React, { Component } from 'react'
import { Modal, TextField, Text, Stack, DefaultButton, PrimaryButton} from 'office-ui-fabric-react'
import '../../public/style.css'
import { PersonaDropdown } from '../PersonaDropdown'

export class Section extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns:[],
            showModul: false,
            title: null,
            message: null,
            id: null,
            supervisor:null,
            type:null
        }

        this.fetchColumns()
    }   

    IActivityStyleProps = {
        borderBlockEnd:" 1px solid red", 
        padding:10
    }

    openEditActivity = (column) => {
        this.setState({ 
            id:column.id,
            title:column.title,
            message:column.message,
            type:column.type,
            supervisor:column.supervisor,
            showModul:true
        })
    }

    fetchEditActivity = () => {
        fetch("/columns", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.title,
                message: this.state.message,
                id: this.state.id,
                supervisor: this.state.supervisor,
                type: this.state.type
            })
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            this.setState({ showModul:false})
            this.fetchColumns()
        })
    }

    fetchColumns = () => {
        fetch("/columns?type=1")
        .then(res => res.json())
        .then(data => {
            console.log("fetching columns: ", data)
            this.setState({columns: [...data.columns]})
        })
        .catch(error => {
            console.log("error fethcing columns: ", error)
        })
    }
    
    deleteColumn = (id) => {
        fetch('/columns', {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id
            })
        })
        .then(Response => Response.json())
        .then( () => {
            this.setState({ showModul: false })
            this.fetchColumns()
        }).catch(error => {
            console.log("error status", error)
        })
    }

    render() {
        return (
            <Stack >
                    {
                        this.state.columns.map( (column, index) => {
                            return (
                                <Stack key={`SectionColumn${index}`}>
                                    <Stack  horizontalAlign="center" style = {{borderBlockEnd: "1px solid gray"}}>
                                        <Stack horizontal  gap={8} className = "Dashboard_Titles">
                                            <DefaultButton  text={column.title} onClick={() => {this.openEditActivity(column)}} />
                                            <PersonaDropdown id={`Section${index}`} loadData={this.props.loadData} columnId={column.id} supervisorId={column.supervisor}/>
                                        </Stack>

                                        <Text className= "Actevity_Text">{column.message}</Text>
                                    </Stack>
                                </Stack>
                            )
                        })
                        
                    }
                    {
                        this.state.showModul && (
                            <Modal className = "Modal"
                                isOpen={this.state.showModul}
                                onDismiss={() => this.setState({showModul: !this.state.showModul}) }
                                isBlocking={false}
                            >
                                <form className="Modal_New_User">
                                    
                                    <TextField label="Rubrik" value={this.state.title} onChange={ (e) => { this.setState({ title: e.target.value }) }}/>
                                    <TextField label="Innehåll" multiline autoAdjusclassNameht className ="TextField" value={this.state.message} onChange={ (e) => { this.setState({ message: e.target.value }) }}/>

                                    <br/>                                    
                                    <PrimaryButton text="Spara" onClick = { () => this.fetchEditActivity()} />
                                    <PrimaryButton text="Ta bort" onClick = { () => this.deleteColumn(this.state.id)}  style={{float:"right"}}/>

                                </form>
                            </Modal>
                            )
                    }
            </Stack>
        )
    }
}

/*

                    <Text style = {{textAlign: "center", fontFamily: "Times"}}>Här kan ni se alla våra sneakers som vi har inne i butiken. Sneakers-modeller från Nike Air Max 90, Nike Air Force 1, Nike Air Max 270, Nike VaporMax, adidas Superstar, adidas Stan Smith, adidas Continental 80, FILA Disruptor, Converse All Star, Reebok Classic Leather</Text>
*/


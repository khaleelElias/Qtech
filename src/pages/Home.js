import * as React from 'react';
import { initializeIcons  } from 'office-ui-fabric-react';

import '../public/style.css'

import { Navbar } from '../components/Navbar'
import { Dashboard } from '../components/Dashboard'

export class Home extends React.Component{

    constructor(props){
        super(props)
        initializeIcons()

        this.state = {
            users: [],
            columns: []
        }

        this.loadData()
        this.fetchColumns()
    }

    render() {
        return(
            <div className="header">
                <header >
                    <Navbar history={this.props.history} loadData={this.loadData.bind(this)} users={this.state.users} />
                </header>
                <Dashboard history={this.props.history} loadData={this.loadData.bind(this)}/>
            </div>
        );
    }

    fetchColumns()  {
        fetch('/columns', {
            method: 'GET',
        }).then(response => 
            response.json()
        ).then(res => {
            console.log(res)
            this.setState({columns: [...res.columns]})
        }).catch(error => {
            console.log(error)
        });
    }

    loadData = () => {
        fetch('/users')
        .then(Response => Response.json())
        .then(res => {
            console.log(res)
            this.setState({users: [...res.users]})
        }).catch( error => {
            console.log("error: ", error)
        })
    }

    
}


/*

<Stack vertical>
                    {
                        this.state.columns.slice(0, 30).map( (column, index) => {
                            return (
                                <Column column={column} />
                            )
                        })
                    }
                </Stack>
            


                 <Stack horizontal style={{width:"100%", display:"flex"}}>
                    <UserBar history={ this.props.history } users={this.state.users} loadData={ this.loadData.bind(this) }/>
                </Stack>
*/
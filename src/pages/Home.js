import * as React from 'react';
import { Stack, initializeIcons  } from 'office-ui-fabric-react';
import { UserBar } from '../components/User_Bar'
import { Column } from '../components/Column'
import '../public/style.css'
import  qtechgroup from '../public/qtechgroup.png'
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
                    <a href="https://qtechgroup.sharepoint.com/SitePages/Intranet.aspx">
                        <img className = "img" src={qtechgroup}  alt=''/>
                    </a>
                    <Navbar history={this.props.history} loadData={this.loadData.bind(this)}/>
                    <UserBar users={this.state.users} loadData={this.loadData.bind(this)}/>
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
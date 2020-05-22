import * as React from 'react';
import { Stack, initializeIcons  } from 'office-ui-fabric-react';
import { UserBar } from '../components/User_Bar'
import { Column } from '../components/Column'
import '../public/style.css'
import  qtechgroup from '../public/qtechgroup.png'
import { Navbar } from '../components/Navbar'
import { Information_Box } from '../components/Information_Box'

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
            <div class = "header">
                <header style={{backgroundImage:"linear-gradient(#bdc3c7,#cfe3d8)"}}>
                    <a href="https://qtechgroup.sharepoint.com/SitePages/Intranet.aspx">
                        <img class = "img" src={qtechgroup}  alt=''/>
                    </a>
                    <Navbar history={this.props.history} />
                </header>

                <Stack horizontal style={{width:"100%", display:"flex"}}>
                    <UserBar history={ this.props.history } users={this.state.users} />
                </Stack>
                <Stack horizontal>
                    <Information_Box/>
                    {
                       // this.state.columns.slice(0, 30).map( (value, index) => {
                           // return (
                                //<Column column={value} />
                          //  )
                       // })
                    }
                </Stack>
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
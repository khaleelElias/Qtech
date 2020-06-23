import React, { Component } from 'react'
import { Action_Menu } from './Action_Menu'
import { Week_Number } from './Week_Number'
import { Stack } from 'office-ui-fabric-react'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import  qtechgroup from '../public/qtechgroup.png'
import { IconButton, IIconProps, initializeIcons } from 'office-ui-fabric-react';
import { UserBar } from '../components/User_Bar'
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Link } from 'react-router-dom'

const iconClass = mergeStyles({
    fontSize: 32,
    height: 30,
    width: 30,
    marginTop: '15px',
    marginLeft: '8px',
    marginRight: '1px',
    color: "#3498DB"
  });


export class Navbar extends Component {
    constructor(props){
        super(props)
        initializeIcons();
    }

    reloadPage()  {
        window.location.reload(false);
    }

    render() {
        return (
            <div className = "Navbar">
                <Stack horizontal>
                    <Link to="/">
                        <FontIcon iconName="Home" className={iconClass} />
                    </Link>
                    <Week_Number/>
                    <Action_Menu reloadData={this.props.loadData} history={this.props.history} />
                    <FontIcon iconName="Refresh" className={iconClass} onClick={this.reloadPage}/>
                    <a style={{marginLeft:"auto"}} href="https://qtechgroup.sharepoint.com/SitePages/Intranet.aspx">
                        <img className = "img" src={qtechgroup}  alt=''/>
                    </a>
                </Stack>
                <UserBar users={this.props.users} loadData={this.props.loadData}/>
                
            </div>
        )
    }
}
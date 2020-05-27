import React, { Component } from 'react'
import { Navbar } from '../components/Navbar'
import "../public/style.css"
import  qtechgroup from '../public/qtechgroup.png'
import { Stack, initializeIcons  } from 'office-ui-fabric-react';
export class EditOrder extends Component {
    constructor(props) {
        super(props)
        initializeIcons()

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                    <a href="https://qtechgroup.sharepoint.com/SitePages/Intranet.aspx">
                        <img className = "img" src={qtechgroup}  alt=''/>
                    </a>
                <Navbar />
            </div>
        )
    }
}


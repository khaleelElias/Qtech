import React, { Component } from 'react'
import qtechgroup from '../public/1.png'

export class Qtech_Logo extends Component {
    render() {
        return (
            <div>
                <a  href="https://qtechgroup.sharepoint.com/SitePages/Intranet.aspx">
                    <img class = "img" src={qtechgroup}  alt=''/>
                </a>
            </div>
        )
    }
}
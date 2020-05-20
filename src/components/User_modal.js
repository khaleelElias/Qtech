import React, { Component } from 'react'
import { useId, useBoolean } from '@uifabric/react-hooks';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import {
  Modal,
  IconButton,
} from 'office-ui-fabric-react';

export class User_modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div>
                        <TextField 
                            label={"First name"}
                            name="name"
                        />
                        
                    </div>



                </form>
                
                
            </div>
        )
    }
}

import React, { Component } from 'react'
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons  } from 'office-ui-fabric-react';



export class Sub_Menu extends Component {
    constructor(props) {
        super(props)
        initializeIcons()

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <CommandBar
                    items={_items}
                />
            </div>
        )
    }
}

const _items = [
    {
      key: 'newItem',
      text: 'New',
      cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
      iconProps: { iconName: 'Add' },
      subMenuProps: {
        items: [
          {
            key: 'Projekt',
            text: 'Projekt',
            iconProps: { iconName: 'ProjectLogoFill16' },
            ['data-automation-id']: 'newEmailButton', // optional
          },
          {
            key: 'Aktivitet',
            text: 'Aktivitet',
            iconProps: { iconName: 'AccountActivity' },
          },
          {
            key: 'Användare',
            text: 'Användare',
            iconProps: { iconName: 'AddFriend' },
          },
        ],
      },
    }
]
import { Divider, ListItemIcon, MenuItem } from '@mui/material'
import React from 'react'

// menuOption: {
//   isDivider: true | false
//   label: Text
//   icon: 
//   onClick
// }
export const MenuOption = ({ option }) => {

  // divider
  if (option.divider) return <Divider />

  // List item with or without icon
  return (
    <MenuItem onClick={option.onClick ? option.onClick : null} >
      {
        option.icon &&
        <ListItemIcon>
          {option.icon}
        </ListItemIcon>
      }
      {option.label}
    </MenuItem>
  )
}

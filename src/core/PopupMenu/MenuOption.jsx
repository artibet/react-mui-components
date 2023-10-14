import { Divider, ListItemIcon, MenuItem } from '@mui/material'
import React from 'react'

// menuOption: {
//   isDivider: true | false
//   label: Text
//   icon: 
//   onClick
// }
export const MenuOption = ({ option }) => {

  // ---------------------------------------------------------------------------------------
  // Click handler
  // ---------------------------------------------------------------------------------------
  const handleClick = (e) => {
    if (!option.onClick) return
    e.stopPropagation()
    option.onClick()
  }

  // divider
  if (option.divider) return <Divider />

  // List item with or without icon
  return (
    <MenuItem onClick={handleClick} >
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

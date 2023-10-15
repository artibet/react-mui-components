import { Box, IconButton, Menu, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import { MenuOption } from './MenuOption';

export const PopupMenu = ({
  tooltip = 'Επιλογές',
  menuIcon = <MenuIcon />,
  options = []
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // ---------------------------------------------------------------------------------------
  // Click handler
  // ---------------------------------------------------------------------------------------
  const handleClick = (e) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  };

  // ---------------------------------------------------------------------------------------
  // Close menu handler
  // ---------------------------------------------------------------------------------------
  const handleClose = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------

  // If no options or all options are hidden return null
  if (!options || options.length === 0) return null
  if (!options.some(option => !option.hidden)) return null


  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={tooltip}>
          <IconButton
            onClick={handleClick}
            size="small"
          >
            {menuIcon}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          options.map((option, index) => (
            <MenuOption key={index} option={option} onClose={handleClose} />
          ))
        }
      </Menu>
    </>
  )
}

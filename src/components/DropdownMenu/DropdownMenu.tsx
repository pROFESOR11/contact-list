import { SvgIconProps } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { withStyles } from '@material-ui/styles'
import React, { useState } from 'react'

const StyledMenu = withStyles({
  paper: {
    borderRadius: '5px',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

interface DropdownMenuItem {
  icon: React.ComponentType<SvgIconProps>
  label: string
  action: () => void
}

type DropdownMenuProps = {
  actions: DropdownMenuItem[]
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ actions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // apply the action and close the dropdown
  const handleAction = (action: () => void) => {
    action?.()
    handleClose()
  }

  return (
    <div>
      <IconButton
        aria-label="contact-actions"
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <MoreHorizIcon fontSize="inherit" color="primary" />
      </IconButton>
      <StyledMenu id="dropdown-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {actions.map(({ action, label, icon: Icon }) => (
          <MenuItem key={label} onClick={() => handleAction(action)}>
            <ListItemIcon>
              <Icon color="primary" />
            </ListItemIcon>
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  )
}

export default DropdownMenu

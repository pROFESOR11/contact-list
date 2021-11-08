import { Box, IconButton } from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call'
import EmailIcon from '@material-ui/icons/Email'
import WebIcon from '@material-ui/icons/Web'
import React from 'react'

import { ContactWithTags } from '@customTypes/ContactWithTags'

interface ContactActionsProps {
  contact: ContactWithTags
}

interface IActionButton {
  type: 'phoneNumber' | 'email' | 'website'
  value: string
}

function addProtocol(value: string): string {
  if (value.substr(0, 4) === 'http') {
    return value
  } else {
    return 'http://' + value
  }
}

const ActionButton: React.FC<IActionButton> = ({ type, value }) => {
  let Icon = CallIcon
  if (type === 'email') {
    Icon = EmailIcon
  } else if (type === 'website') {
    Icon = WebIcon
  }

  let aHref = ''
  if (type === 'phoneNumber') {
    aHref = 'tel: ' + value
  } else if (type === 'email') {
    aHref = 'mailto: ' + value
  } else if (type === 'website') {
    aHref = addProtocol(value)
  }

  return (
    <a target="_blank" href={aHref} rel="noreferrer">
      <IconButton aria-label={type}>
        <Icon fontSize="inherit" color="primary" />
      </IconButton>
    </a>
  )
}

const ContactActions: React.FC<ContactActionsProps> = ({ contact }) => {
  const { email, website, phoneNumber } = contact

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {Object.entries({ email, website, phoneNumber }).map(([key, value]) => {
        if (value) {
          return (
            <ActionButton
              key={`${contact.id}-${key}`}
              value={value}
              type={key as 'email' | 'website' | 'phoneNumber'}
            />
          )
        }
      })}
    </Box>
  )
}

export default ContactActions

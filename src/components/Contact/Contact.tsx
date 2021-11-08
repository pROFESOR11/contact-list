import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import { useConfirm } from 'material-ui-confirm'
import React, { useCallback } from 'react'

import ContactActions from '@components/ContactActions'
import ContactTags from '@components/ContactTags'
import DropdownMenu from '@components/DropdownMenu'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import { getFirstLettersOfFullName, getFullName } from '@helpers/misc'

interface ContactProps {
  contact: ContactWithTags
  activateEditMode: (contact: ContactWithTags) => void
  deleteContact: (contact: ContactWithTags) => Promise<void>
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    boxShadow: '0px 3px 6px #5D5D5D29',
    borderRadius: '15px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: theme.spacing(4, 3, 1, 3),
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: '1rem',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderRightContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  footer: {
    marginTop: theme.spacing(2),
  },
}))

const Contact: React.FC<ContactProps> = ({ contact, activateEditMode, deleteContact }) => {
  const classes = useStyles()
  const { name, lastName, tags, email, avatar, phoneNumber } = contact
  const confirm = useConfirm()

  const handleDeleteContact = useCallback(
    (contact) => {
      confirm({
        description: 'Are you sure?',
        content: 'This contact will be permanently deleted!',
        dialogProps: {
          'aria-label': 'contact-delete-confirmation-dialog',
        },
      })
        .then(() => deleteContact(contact))
        .catch(() => undefined)
    },
    [confirm, deleteContact]
  )
  return (
    <Paper className={classes.paper} data-testid={`contact-${contact.id}`}>
      <>
        <Box className={classes.cardHeader}>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar
              data-testid={`avatar-${contact.id}`}
              className={classes.avatar}
              src={avatar}
              alt={getFullName({ name, lastName })}
            >
              {getFirstLettersOfFullName({ name, lastName })}
            </Avatar>
            <Box className={classes.cardHeaderRightContainer}>
              <Typography variant="body1">{getFullName({ name, lastName })}</Typography>
              <Typography variant="caption">{email || phoneNumber || ' '}</Typography>
            </Box>
          </Box>
          <Box alignSelf="flex-start">
            <DropdownMenu
              contactId={contact.id}
              actions={[
                {
                  icon: EditIcon,
                  label: 'Edit',
                  action: () => activateEditMode(contact),
                },
                {
                  icon: DeleteForeverIcon,
                  label: 'Delete',
                  action: () => handleDeleteContact(contact),
                },
              ]}
            />
          </Box>
        </Box>
        <Box className={classes.footer}>
          <ContactTags tags={tags} />
        </Box>
      </>
      <Box>
        <ContactActions contact={contact} />
      </Box>
    </Paper>
  )
}

export default Contact

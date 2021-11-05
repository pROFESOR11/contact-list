import { makeStyles, SwipeableDrawer, SwipeableDrawerProps } from '@material-ui/core'
import React from 'react'

import ContactForm from '@components/ContactForm'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import { UseContactsMethods } from '@customTypes/UseContactsType'

import { Tag } from '.prisma/client'

const useStyles = makeStyles({
  root: {
    width: '80vw',
    maxWidth: '750px',
    padding: '1rem',
    marginTop: '2rem',
  },
})

type DrawerProps = Partial<SwipeableDrawerProps> & {
  tagOptions: Tag[]
  toggleDrawer: () => void
  open: boolean
  methods: UseContactsMethods
  initialValues?: ContactWithTags
}

const Drawer: React.FC<DrawerProps> = ({ open, toggleDrawer, tagOptions, methods, initialValues, ...props }) => {
  const classes = useStyles()

  return (
    <div role="presentation">
      <SwipeableDrawer anchor="right" open={open} onClose={toggleDrawer} onOpen={toggleDrawer} {...props}>
        <div className={classes.root}>
          <ContactForm
            tagOptions={tagOptions}
            methods={methods}
            onSuccess={toggleDrawer}
            initialValues={initialValues}
          />
        </div>
      </SwipeableDrawer>
    </div>
  )
}

export default Drawer

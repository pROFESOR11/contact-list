import { Box, Grid, makeStyles, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Contact from '@components/Contact'
import Drawer from '@components/Drawer'
import SearchBar from '@components/SearchBar'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import { UseContactsMethods } from '@customTypes/UseContactsType'
import { addFlattenedSearchArray } from '@helpers/flatten'
import useDebounce from '@hooks/useDebounce'
import useToggle from '@hooks/useToggle'

import { Tag } from '.prisma/client'

interface ContactsProps {
  contacts: ContactWithTags[]
  methods: UseContactsMethods
}

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
})

const Contacts: React.FC<ContactsProps> = ({ contacts, methods }) => {
  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))

  const [isDrawerOpen, toggleDrawer] = useToggle()
  const [selectedContact, setselectedContact] = useState<ContactWithTags | undefined>(undefined)
  const [filteredContacts, setfilteredContacts] = useState<ContactWithTags[]>()
  const [searchValue, setsearchValue] = useState<string>('')

  // get unique tag options
  const tagOptions: Tag[] = [
    ...new Set(
      contacts
        .map((contact) => contact?.tags || [])
        .flat()
        .map((tag) => JSON.stringify(tag))
    ),
  ].map((jsonTag) => JSON.parse(jsonTag))

  const activateEditMode = useCallback(
    (contact: ContactWithTags) => {
      setselectedContact(contact)
      toggleDrawer()
    },
    [toggleDrawer]
  )

  const activateCreateMode = useCallback(() => {
    setselectedContact(undefined)
    toggleDrawer()
  }, [toggleDrawer])

  const handleSearchFilterChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setsearchValue(event.target.value)
  }, [])

  const handleSearchClear = useCallback(() => {
    setsearchValue('')
  }, [])

  const debouncedSearchTerm = useDebounce(searchValue, 500)

  const searchableContacts = useMemo(() => {
    return addFlattenedSearchArray(contacts)
  }, [contacts])

  useEffect(() => {
    setfilteredContacts(
      searchableContacts.filter((contact) =>
        contact.searchArray.some((searchArrayField) => searchArrayField.includes(debouncedSearchTerm.toLowerCase()))
      )
    )
  }, [contacts, debouncedSearchTerm, searchableContacts])

  const contactsVisible = useMemo(() => {
    if (debouncedSearchTerm) {
      return filteredContacts
    }
    return contacts
  }, [contacts, debouncedSearchTerm, filteredContacts])

  const ListEmpty = () => {
    return (
      <Box>
        <Typography>No contacts available..</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box className={classes.header} mb="2rem" mt="0.5rem">
        <Box className={classes.headerLeftContainer}>
          <Typography variant="h4">Contacts</Typography>
          <Box ml="1rem">
            <Typography variant="subtitle1">{contacts.length} Total</Typography>
          </Box>
        </Box>
        <Box mr="1rem">
          <SearchBar placeholder="Search" onChange={handleSearchFilterChange} onClear={handleSearchClear} />
        </Box>
        <Button
          data-testid="add-contact"
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={activateCreateMode}
        >
          {!downMd && 'Add Contact'}
        </Button>
      </Box>
      {contactsVisible.length > 0 ? (
        <Grid container spacing={4}>
          {contactsVisible.map((contact) => (
            <Grid key={contact.id} item xs={12} md={6}>
              <Contact contact={contact} activateEditMode={activateEditMode} deleteContact={methods.deleteContact} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <ListEmpty />
      )}
      <Drawer
        open={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        tagOptions={tagOptions}
        methods={methods}
        initialValues={selectedContact}
      />
    </Box>
  )
}

export default Contacts

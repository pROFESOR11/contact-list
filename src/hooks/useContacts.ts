import { useCallback, useState } from 'react'

import { ContactFormValues } from '@customTypes/ContactFormValues'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import { TagChanges, UseContactsProps } from '@customTypes/UseContactsType'
import {
  createContact as createContactDB,
  deleteContact as deleteContactDB,
  editContact as editContactDB,
} from '@helpers/api'

const useContacts = (initialState = []): UseContactsProps => {
  const [contacts, setcontacts] = useState<ContactWithTags[]>(initialState)

  const addContact = useCallback(async (contactFormValue: ContactFormValues) => {
    const createdContact = await createContactDB(contactFormValue)
    setcontacts((currentContacts) => [createdContact].concat(currentContacts))
  }, [])

  const editContact = useCallback(async (contact: Partial<ContactFormValues>, tagChanges: TagChanges) => {
    const editedContact = await editContactDB(contact, tagChanges)
    setcontacts((currentContacts) =>
      currentContacts.map((currentContact) => {
        if (currentContact.id === editedContact.id) {
          return editedContact
        } else {
          return currentContact
        }
      })
    )
  }, [])

  const deleteContact = useCallback(async (contact: ContactWithTags) => {
    const deletedContact = await deleteContactDB(contact)
    setcontacts((currentContacts) =>
      currentContacts.filter((currentContact) => currentContact.id !== deletedContact.id)
    )
  }, [])

  return [contacts, { addContact, deleteContact, editContact }]
}

export default useContacts

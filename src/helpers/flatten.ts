// This file contains helpers for flattening the Contract model
// so that we will to be able to search through searchable attributes

import { ContactWithTags } from '@customTypes/ContactWithTags'

export const flattenContact = (contact: ContactWithTags): string[] => {
  const { name = '', lastName = '', phoneNumber = '', email = '', website = '', tags = [] } = contact
  const searchableItemFields: string[] = [name, lastName, phoneNumber, email, website]

  const tagLabels: string[] = tags.map((tag) => tag.label)
  return searchableItemFields
    .concat(tagLabels)
    .filter((item) => item != undefined)
    .map((item) => item.toLowerCase())
}

export const addFlattenedSearchArray = (
  contacts: ContactWithTags[]
): (ContactWithTags & { searchArray: string[] })[] => {
  return contacts.map((contact) => ({
    ...contact,
    searchArray: flattenContact(contact),
  }))
}

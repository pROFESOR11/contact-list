import { ContactFormValues } from './ContactFormValues'
import { ContactWithTags } from './ContactWithTags'

import { Tag } from '.prisma/client'

export interface TagChanges {
  addedTags: Tag[]
  removedTags: Tag[]
}

export type UseContactsMethods = {
  addContact: (contact: ContactFormValues) => Promise<void>
  deleteContact: (contact: ContactWithTags) => Promise<void>
  editContact: (contact: Partial<ContactFormValues> & { id: number }, tagChanges: TagChanges) => Promise<void>
}

export type UseContactsProps = [ContactWithTags[], UseContactsMethods]

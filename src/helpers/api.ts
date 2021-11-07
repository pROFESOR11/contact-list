import { ContactFormValues } from '@customTypes/ContactFormValues'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import { TagChanges } from '@customTypes/UseContactsType'

import { hydrateContactFormData } from './hydration'
import { uploadImage } from './image'

import { Tag } from '.prisma/client'

export function getApiRoute(): string {
  return (
    (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000') +
    `/api`
  )
}

export const createTag = async ({ label }: { label: string }): Promise<Tag | null> => {
  try {
    const response = await fetch('/api/tag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ label }),
    })
    const responseJson = await response.json()
    return responseJson
  } catch (err) {
    return null
  }
}

export const createContact = async (contactFormValues: ContactFormValues): Promise<ContactWithTags | null> => {
  try {
    const { tags, avatar, ...rest } = contactFormValues

    let avatarUrl = avatar
    if (avatar) {
      avatarUrl = await uploadImage({ base64: avatar })
    }
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        hydrateContactFormData(
          {
            ...rest,
            avatar: avatarUrl,
          },
          {
            addedTags: tags,
            removedTags: [],
          }
        )
      ),
    })
    const responseJson = await response.json()
    return responseJson
  } catch (err) {
    return null
  }
}

export const deleteContact = async (contact: ContactWithTags): Promise<ContactWithTags | null> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: contact.id }),
    })
    const responseJson = await response.json()
    return responseJson
  } catch (err) {
    return null
  }
}

export const editContact = async (
  editContactValues: Partial<ContactFormValues>,
  tagChanges: TagChanges
): Promise<ContactWithTags | null> => {
  try {
    const { avatar } = editContactValues
    let avatarUrl = avatar
    if (avatar) {
      avatarUrl = await uploadImage({ base64: avatar })
    }
    const response = await fetch('/api/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        hydrateContactFormData(
          {
            ...editContactValues,
            avatar: avatarUrl,
          },
          tagChanges
        )
      ),
    })
    const responseJson = await response.json()
    return responseJson
  } catch (err) {
    return null
  }
}

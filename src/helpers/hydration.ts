// This file contains helpers for converting form values to DB fields - so called hydration -
// and also converting DB values to the shape that form on the front-end can understand and visualize - so called dehydration

import { ContactFormValues } from '@customTypes/ContactFormValues'

import { Prisma, Tag } from '.prisma/client'

export const hydrateContactFormData = (
  contactFormValues: Partial<ContactFormValues>,
  { addedTags, removedTags } = { addedTags: [], removedTags: [] }
): Prisma.ContactUpdateInput => {
  if (!contactFormValues) return
  const { dob, ...rest } = contactFormValues
  const dobAsDate = new Date(dob)
  const tagsAsPrismaInput: Prisma.TagUpdateManyWithoutContactsInput = {
    ...(addedTags.length > 0 && {
      connect: addedTags.map((tag) => ({
        id: tag.id,
      })),
    }),
    ...(removedTags.length > 0 && {
      disconnect: removedTags.map((tag) => ({
        id: tag.id,
      })),
    }),
  }
  return {
    ...rest,
    dob: dobAsDate,
    tags: tagsAsPrismaInput,
  }
}

export const dehydrateContactFormData = (
  prismaData: Omit<Prisma.ContactCreateInput, 'tags'> & { tags: Tag[] }
): ContactFormValues => {
  if (!prismaData) return null

  const { dob, ...rest } = prismaData

  const dobAsString =
    dob == null ? '' : typeof dob === 'string' ? dob?.split('T')?.[0] : dob.toISOString().split('T')[0]

  for (const key of Object.keys(rest)) {
    if (rest[key] == null) {
      rest[key] = ''
    }
  }
  return {
    ...rest,
    dob: dobAsString,
  }
}

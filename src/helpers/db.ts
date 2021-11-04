import { ContactWithTags } from '@customTypes/ContactWithTags'
import prisma from '@lib/prisma'

import { Prisma, Tag } from '.prisma/client'

export const fetchContacts = async (): Promise<ContactWithTags[]> => {
  return await prisma.contact.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
    },
  })
}

export const fetchContact = async (fetchContactInput: Prisma.ContactWhereUniqueInput): Promise<ContactWithTags> => {
  return await prisma.contact.findUnique({
    where: fetchContactInput,
    include: {
      tags: true,
    },
  })
}

export const createContact = async (contactCreateInput: Prisma.ContactCreateInput): Promise<ContactWithTags> => {
  return await prisma.contact.create({
    data: contactCreateInput,
    include: {
      tags: true,
    },
  })
}

export const updateContact = async (
  contactSelector: Prisma.ContactWhereUniqueInput,
  updateData: Prisma.XOR<Prisma.ContactUpdateInput, Prisma.ContactUncheckedUpdateInput>
): Promise<ContactWithTags> => {
  return await prisma.contact.update({
    where: contactSelector,
    data: updateData,
    include: {
      tags: true,
    },
  })
}

export const deleteContact = async (deleteContactInput: Prisma.ContactWhereUniqueInput): Promise<ContactWithTags> => {
  return await prisma.contact.delete({
    where: deleteContactInput,
    include: {
      tags: true,
    },
  })
}

export const createTag = async (createTagInput: Prisma.TagCreateInput): Promise<Tag> => {
  return await prisma.tag.create({
    data: createTagInput,
  })
}

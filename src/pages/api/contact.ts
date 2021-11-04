import type { NextApiRequest, NextApiResponse } from 'next'

import { ContactWithTags } from '@customTypes/ContactWithTags'
import { createContact, deleteContact, fetchContact, updateContact } from '@helpers/db'

import { Prisma } from '.prisma/client'

export default async function handle(req: NextApiRequest, res: NextApiResponse<ContactWithTags | { error: string }>) {
  try {
    if (req.method === 'POST') {
      const createdContact = await createContact(req.body as Prisma.ContactCreateInput)
      res.json(createdContact)
    } else if (req.method === 'GET') {
      const existingContact = await fetchContact(req.body as Prisma.ContactWhereUniqueInput)
      res.json(existingContact)
    } else if (req.method === 'DELETE') {
      const deletedContact = await deleteContact(req.body as Prisma.ContactWhereUniqueInput)
      res.json(deletedContact)
    } else if (req.method === 'PUT') {
      const { id, ...rest } = req.body
      const updatedContact = await updateContact({ id }, rest)
      res.json(updatedContact)
    } else {
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
    }
  } catch (err) {
    res.json({ error: err.message.trim() })
  }
}

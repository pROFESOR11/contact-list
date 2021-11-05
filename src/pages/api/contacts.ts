import type { NextApiRequest, NextApiResponse } from 'next'

import { ContactWithTags } from '@customTypes/ContactWithTags'
import { fetchContacts } from '@helpers/db'

export default async function handle(req: NextApiRequest, res: NextApiResponse<ContactWithTags[] | { error: string }>) {
  try {
    if (req.method === 'GET') {
      const contacts = await fetchContacts()
      res.json(contacts)
    } else {
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
    }
  } catch (err) {
    res.json({ error: err.message.trim() })
  }
}

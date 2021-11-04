import type { NextApiRequest, NextApiResponse } from 'next'

import { createTag } from '@helpers/db'

import { Tag } from '.prisma/client'

export default async function handle(req: NextApiRequest, res: NextApiResponse<Tag | { error: string }>) {
  try {
    if (req.method === 'POST') {
      const createdTag = await createTag(req.body)
      res.json(createdTag)
    } else {
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
    }
  } catch (err) {
    res.json({ error: err.message.trim() })
  }
}

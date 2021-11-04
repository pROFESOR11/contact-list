import { Prisma } from '@prisma/client'

const contactWithTags = Prisma.validator<Prisma.ContactArgs>()({
  include: { tags: true },
})

export type ContactWithTags = Prisma.ContactGetPayload<typeof contactWithTags>

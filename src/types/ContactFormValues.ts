import { Tag } from '.prisma/client'

export type ContactFormValues = {
  name: string
  lastName?: string
  phoneNumber: string
  email?: string
  dob?: string
  tags?: Tag[]
  avatar?: string
  website?: string
}

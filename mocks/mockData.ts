import { ContactWithTags } from '../src/types/ContactWithTags'

import { Tag } from '.prisma/client'

export const EXISTING_TAGS: Tag[] = [
  {
    id: 1,
    label: 'work',
  },
  {
    id: 2,
    label: 'school',
  },
]

export const NEW_CONTACT: ContactWithTags = {
  id: 3,
  createdAt: new Date('2021-11-03T17:44:02.170Z'),
  updatedAt: new Date('2021-11-03T17:44:02.170Z'),
  name: 'Luke',
  lastName: 'Lopez',
  phoneNumber: '0706-579-306',
  email: 'luke.lopez@example.com',
  dob: new Date('1961-03-08T09:12:40.017Z'),
  avatar: 'https://randomuser.me/api/portraits/med/men/53.jpg',
  website: 'lukelop.com',
  tags: [EXISTING_TAGS[1]],
}

export const EDITED_CONTACT = {
  id: 1,
  createdAt: new Date('2021-11-03T17:44:02.170Z'),
  updatedAt: new Date(),
  // changed name
  name: 'John',
  lastName: 'Gibson',
  // changed phone
  phoneNumber: '11-962-7516',
  // changed email
  email: 'brad.gibson@example.io',
  dob: new Date('1993-07-20T09:44:18.674Z'),
  avatar: 'https://randomuser.me/api/portraits/med/men/75.jpg',
  website: 'bgibson.com',
  tags: [EXISTING_TAGS[0], EXISTING_TAGS[1]],
}

export const EXISTING_CONTACTS: ContactWithTags[] = [
  {
    id: 1,
    createdAt: new Date('2021-11-03T17:44:02.170Z'),
    updatedAt: new Date('2021-11-03T17:44:02.170Z'),
    name: 'Brad',
    lastName: 'Gibson',
    phoneNumber: '011-962-7516',
    email: 'brad.gibson@example.com',
    dob: new Date('1993-07-20T09:44:18.674Z'),
    avatar: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    website: 'bgibson.com',
    tags: [EXISTING_TAGS[0], EXISTING_TAGS[1]],
  },
  {
    id: 2,
    createdAt: new Date('21-11-03T17:36:19.860Z'),
    updatedAt: new Date('21-11-03T17:51:20.754Z'),
    name: 'Beth',
    lastName: 'Rodriguez',
    phoneNumber: '(657)-763-6400',
    email: 'beth.rodriguez@example.com',
    dob: new Date('1978-05-28T00:00:00.000Z'),
    avatar: 'https://randomuser.me/api/portraits/med/women/40.jpg',
    website: 'brodri.com',
    tags: [EXISTING_TAGS[0]],
  },
]

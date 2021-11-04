/* eslint-disable no-console */
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const contactData: Prisma.ContactCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@example.io',
    phoneNumber: '+90554552341',
    tags: {
      create: {
        label: 'school',
      },
    },
  },
  {
    name: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    phoneNumber: '+90323-092-2122',
    tags: {
      create: {
        label: 'work',
      },
    },
  },
  {
    name: 'David',
    lastName: 'Beckham',
    email: 'd.beckham@example.com',
    phoneNumber: '+90554552122',
    tags: {
      create: [
        {
          label: 'sports',
        },
        {
          label: 'dance',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const contact of contactData) {
    const contactCreated = await prisma.contact.create({
      data: contact,
    })
    console.log(`Created contact with id: ${contactCreated.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

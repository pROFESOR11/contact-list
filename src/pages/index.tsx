import { GetServerSideProps } from 'next'
import React from 'react'

import Contacts from '@components/Contacts'
import Layout from '@components/Layout'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import useContacts from '@hooks/useContacts'
import prisma from '@lib/prisma'

interface HomeProps {
  contacts: ContactWithTags[]
}

export const Home: React.FC<HomeProps> = ({ contacts: initialContacts }) => {
  const [contacts, methods] = useContacts(initialContacts)

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content>
        <Contacts contacts={contacts} methods={methods} />
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
    },
  })

  return {
    props: { contacts },
  }
}

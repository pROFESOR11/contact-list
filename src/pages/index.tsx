import { GetServerSideProps } from 'next'
import React from 'react'

import Contacts from '@components/Contacts'
import Layout from '@components/Layout'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import useContacts from '@hooks/useContacts'

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
  try {
    const contacts = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contacts`).then((res) => res.json())

    return {
      props: {
        contacts,
      },
    }
  } catch {
    return {
      props: {
        contacts: [],
      },
    }
  }
}

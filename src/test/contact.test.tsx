import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import Contact from '@components/Contact'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import { getFirstLettersOfFullName } from '@helpers/misc'

import { render } from './testUtils'

import '@testing-library/jest-dom/extend-expect'

describe('</Contact >', () => {
  let activateEditMode: jest.Mock<any, any>,
    deleteContact: jest.Mock<any, any>,
    contact: ContactWithTags,
    contactEl: HTMLElement

  beforeEach(async () => {
    activateEditMode = jest.fn()
    deleteContact = jest.fn()
    contact = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatar: '',
      dob: new Date(),
      email: 'jdoe@example.com',
      lastName: 'doe',
      name: 'john',
      phoneNumber: '+522156',
      website: 'jdoe.com',
      tags: [
        {
          id: 1,
          label: 'football',
        },
        {
          id: 2,
          label: 'school',
        },
      ],
    }

    render(<Contact contact={contact} activateEditMode={activateEditMode} deleteContact={deleteContact} />)
    contactEl = screen.getByTestId(`contact-${contact.id}`)
  })

  test('render avatar as first letters of name', () => {
    const avatar = screen.getByTestId(`avatar-${contact.id}`)
    expect(avatar).toHaveTextContent(getFirstLettersOfFullName({ name: contact.name, lastName: contact.lastName }))
  })

  test('tag list should include given tags', () => {
    const tagList = within(contactEl).getByRole('list')
    expect(tagList).toHaveTextContent(contact.tags.map((tag) => tag.label).join(''))
  })

  test('actions icon should exist', () => {
    expect(
      screen.getByRole('button', {
        name: /contact-actions/i,
      })
    ).toBeInTheDocument()
  })

  test('actions should include edit', () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /contact-actions/i,
      })
    )
    expect(
      screen.getByRole('menuitem', {
        name: /edit/i,
      })
    ).toBeInTheDocument()
  })

  test('actions should include delete', () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /contact-actions/i,
      })
    )
    expect(
      screen.getByRole('menuitem', {
        name: /delete/i,
      })
    ).toBeInTheDocument()
  })

  test('activateEditMode should be called on edit action', () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /contact-actions/i,
      })
    )
    userEvent.click(
      screen.getByRole('menuitem', {
        name: /edit/i,
      })
    )
    expect(activateEditMode).toHaveBeenCalledWith(contact)
  })

  test('deleteContact should be called on delete action', async () => {
    userEvent.click(
      screen.getByRole('button', {
        name: /contact-actions/i,
      })
    )
    userEvent.click(
      screen.getByRole('menuitem', {
        name: /delete/i,
      })
    )
    const confirmationDialog = screen.getByLabelText('contact-delete-confirmation-dialog')
    expect(confirmationDialog).toBeInTheDocument()

    const okButton = await screen.findByRole('button', {
      name: /ok/i,
    })

    userEvent.click(okButton)

    // since this is async action due to material-ui-confirm, we need to waitFor
    await waitFor(() => {
      expect(deleteContact).toHaveBeenCalledWith(contact)
    })
  })
})

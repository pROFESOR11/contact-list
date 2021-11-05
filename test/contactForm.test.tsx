import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import ContactForm from '@components/ContactForm'
import '@testing-library/jest-dom/extend-expect'

import { render } from './testUtils'

const defaultFormValues = {
  name: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  dob: '',
  tags: [],
  avatar: '',
  website: '',
}

describe('contact form', () => {
  let onSuccess: jest.Mock<any, any>,
    addContact: jest.Mock<any, any>,
    editContact: jest.Mock<any, any>,
    deleteContact: jest.Mock<any, any>,
    submit: HTMLElement,
    name: HTMLElement,
    email: HTMLElement,
    lastName: HTMLElement,
    phoneNumber: HTMLElement,
    website: HTMLElement,
    tags: HTMLElement

  beforeEach(async () => {
    onSuccess = jest.fn()
    addContact = jest.fn()
    editContact = jest.fn()
    deleteContact = jest.fn()

    const tagOptions = [{ id: 1, label: 'asdasd' }]
    render(
      <ContactForm onSuccess={onSuccess} tagOptions={tagOptions} methods={{ addContact, editContact, deleteContact }} />
    )
    submit = screen.getByTestId(/submit/i)
    name = screen.getByTestId('name', { exact: true })
    email = screen.getByTestId(/email/i)
    lastName = screen.getByTestId(/lastname/i)
    phoneNumber = screen.getByTestId(/phoneNumber/i)
    website = screen.getByTestId(/website/i)
    tags = screen.getByTestId(/form-tags/i)
  })

  test('tag options should be expanded on focus', () => {
    expect(tags).toHaveAttribute('aria-expanded', 'false')
    userEvent.click(tags.querySelector('input'))
    expect(tags).toHaveAttribute('aria-expanded', 'true')
  })

  test('initially submit button should be disabled', () => {
    expect(submit).toBeDisabled()
  })

  test('submit button should be enabled when form gets dirty', () => {
    userEvent.type(email.querySelector('input'), 'john.dee@someemail.com')
    expect(submit).not.toBeDisabled()
  })

  test('if required field are empty, show error messages', async () => {
    userEvent.type(email.querySelector('input'), 'john.dee@someemail.com')
    userEvent.type(lastName.querySelector('input'), 'Dee')
    userEvent.click(submit)
    await waitFor(() => {
      expect(phoneNumber).toHaveTextContent('Please enter')
      expect(name).toHaveTextContent('Please enter')
      expect(website).not.toHaveTextContent('Please enter')
    })
  })

  test('onSubmit should be called with correct params', async () => {
    userEvent.type(email.querySelector('input'), 'john.dee@someemail.com')
    userEvent.type(lastName.querySelector('input'), 'Dee')
    userEvent.type(name.querySelector('input'), 'John')
    userEvent.type(phoneNumber.querySelector('input'), '+2135512')

    userEvent.click(submit)

    await waitFor(() =>
      expect(addContact).toHaveBeenCalledWith({
        ...defaultFormValues,
        email: 'john.dee@someemail.com',
        name: 'John',
        lastName: 'Dee',
        phoneNumber: '+2135512',
      })
    )
  })
})

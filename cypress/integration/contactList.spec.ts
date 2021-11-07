// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />

import { EDITED_CONTACT, EXISTING_CONTACTS, NEW_CONTACT } from '../../mocks/mockData'

describe('NextJS Contact List Test Kit', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to add contact', () => {
    cy.getByTestId('add-contact').click()

    const submitButton = cy.getByTestId('submit')
    submitButton.should('be.disabled').and('contain.text', 'Submit')

    cy.get('#email').type(NEW_CONTACT.email)
    submitButton.should('be.enabled')

    cy.get('#contactForm').submit()
    cy.get('#name-helper-text').should('contain.text', 'Please enter')
    cy.get('#phoneNumber-helper-text').should('contain.text', 'Please enter')

    cy.get('#name').type(NEW_CONTACT.name)
    cy.get('#lastName').type(NEW_CONTACT.lastName)
    cy.get('#phoneNumber').type(NEW_CONTACT.phoneNumber)
    cy.get('#dob').type(NEW_CONTACT.dob.toISOString().split('T')[0])
    cy.get('#website').type(NEW_CONTACT.website)

    NEW_CONTACT.tags.map((tag) => {
      cy.get('#tags').type(tag.label + '{enter}')
    })

    cy.get('#contactForm').submit()
    cy.getByTestId(`contact-${NEW_CONTACT.id}`).should('be.visible')
  })

  it('should be able to edit contact', async () => {
    cy.getByTestId('contact-1').within(() => {
      cy.getByTestId('contact-actions-dropdown-menu').click()
    })

    cy.getByTestId('contact-1-action-Edit').click()

    // should not be able to submit with clearing required fields
    cy.get('#name').clear()
    cy.get('#contactForm').submit()
    cy.get('#name-helper-text').should('contain.text', 'Please enter')

    // edit attributes
    cy.get('#name').type(EDITED_CONTACT.name)
    cy.get('#email').clear().type(EDITED_CONTACT.email)
    cy.get('#phoneNumber').clear().type(EDITED_CONTACT.phoneNumber)

    // form should be submitted
    cy.get('#contactForm').submit()
    cy.get('#contactForm').should('not.be.visible')
  })

  it('should be able to delete contact', async () => {
    cy.getByTestId('contact-1').within(() => {
      cy.getByTestId('contact-actions-dropdown-menu').click()
    })

    cy.getByTestId('contact-1-action-Delete').click()
    cy.get('.MuiButton-textPrimary').click()

    cy.get('.MuiGrid-container')
      .children()
      .should('have.length', EXISTING_CONTACTS.length - 1)
  })
})

import { rest } from 'msw'

import { CONFIG } from './config'
import { EDITED_CONTACT, EXISTING_CONTACTS, NEW_CONTACT } from './mockData'

export const handlers = [
  rest.get(`${CONFIG.API_ROUTE}/contacts`, (req, res, ctx) => {
    return res(ctx.json(EXISTING_CONTACTS))
  }),
  rest.post(`${CONFIG.API_ROUTE}/contact`, (req, res, ctx) => {
    return res(ctx.json(NEW_CONTACT))
  }),
  rest.put(`${CONFIG.API_ROUTE}/contact`, (req, res, ctx) => {
    return res(ctx.json(EDITED_CONTACT))
  }),
  rest.delete(`${CONFIG.API_ROUTE}/contact`, (req, res, ctx) => {
    return res(ctx.json(EXISTING_CONTACTS[0]))
  }),
]

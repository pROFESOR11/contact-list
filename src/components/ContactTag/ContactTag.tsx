import { Chip, ChipProps } from '@material-ui/core'
import React from 'react'

import { Tag } from '.prisma/client'

interface ContactTagProps {
  tag: Tag
}

const ContactTag: React.FC<ContactTagProps & ChipProps> = ({ tag, ...rest }) => (
  <Chip label={tag.label} size="small" {...rest} color="primary" />
)

export default ContactTag

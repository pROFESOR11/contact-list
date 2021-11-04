import { Button, makeStyles, Grid, Box, FormHelperText } from '@material-ui/core'
import { FormikProvider, Form, useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'

import FormAvatarInput from '@components/Form/FormAvatarInput'
import FormChipInput from '@components/Form/FormChipInput'
import FormTextInput from '@components/Form/FormTextInput'
import { ContactFormValues } from '@customTypes/ContactFormValues'
import { ContactWithTags } from '@customTypes/ContactWithTags'
import { UseContactsMethods } from '@customTypes/UseContactsType'
import { dehydrateContactFormData } from '@helpers/hydration'

import { Tag } from '.prisma/client'

const validationSchema = yup.object({
  name: yup.string().required('Please enter name'),
  lastName: yup.string(),
  phoneNumber: yup.string().required('Please enter phone number'),
  email: yup.string().email('Please enter a valid email'),
  dob: yup.date().max(new Date(), 'Please enter a vaid birth date'),
  tags: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      label: yup.string(),
    })
  ),
  avatar: yup.string(),
  website: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Please enter a valid url'
    ),
})

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 0.5rem',
    '& *': {
      paddingTop: theme.spacing(0.5),
    },
  },
}))
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

interface ContactFormProps {
  onSuccess?: () => void
  initialValues?: ContactWithTags
  tagOptions?: Tag[]
  methods: UseContactsMethods
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSuccess,
  initialValues = defaultFormValues,
  tagOptions,
  methods: { addContact, editContact },
}) => {
  const classes = useStyles()

  const [formError, setformError] = useState<undefined | string>(undefined)

  const formik = useFormik({
    initialValues: dehydrateContactFormData(initialValues),
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setformError(undefined)
        setSubmitting(true)
        if ('id' in initialValues) {
          const { tags, ...rest } = values
          const addedTags = tags.filter(
            (newStatusTag) =>
              !dehydrateContactFormData(initialValues)
                ?.tags.map((tag) => tag.id)
                .includes(newStatusTag.id)
          )
          const removedTags = dehydrateContactFormData(initialValues)?.tags.filter(
            (initialTag) => !tags.map((tag) => tag.id).includes(initialTag.id)
          )
          const changedPrimitives: Partial<ContactFormValues> = Object.entries(rest).reduce((acc, [key, value]) => {
            const hasChanged = initialValues[key] !== value

            if (hasChanged) {
              acc[key] = value
            }

            return acc
          }, {})

          await editContact?.(
            {
              id: initialValues.id,
              ...changedPrimitives,
            },
            { addedTags, removedTags }
          )
        } else {
          await addContact?.(values)
        }
        onSuccess?.()
      } catch (err) {
        setformError(err.message)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div>
      <FormikProvider value={formik}>
        <Form>
          <div className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormAvatarInput name="avatar" type="text" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormTextInput fullWidth name="name" type="text" label="Name" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormTextInput fullWidth name="lastName" type="text" label="Last Name" />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormTextInput fullWidth name="phoneNumber" type="text" label="Phone Number" required />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextInput fullWidth name="email" type="email" label="Email" />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormTextInput fullWidth name="dob" type="date" label="Year Of Birth" />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormTextInput fullWidth name="website" type="text" label="Website" />
              </Grid>
            </Grid>
            <FormChipInput name="tags" type="text" label="Tags" options={tagOptions} />
          </div>
          <Box my={3}>
            <FormHelperText error={!!formError}>{formError || ' '}</FormHelperText>
          </Box>
          <Box display="flex" flexDirection="row" flexGrow={1} mt={2} justifyContent="center">
            <Button type="submit" variant="contained" color="primary" disabled={!formik.dirty || formik.isSubmitting}>
              Submit
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default ContactForm

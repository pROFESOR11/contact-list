import { TextField, TextFieldProps } from '@material-ui/core'
import { FieldHookConfig, useField } from 'formik'
import React from 'react'

export const FormTextInput: React.FC<FieldHookConfig<string> & TextFieldProps> = (props) => {
  const [field, meta] = useField(props)
  const { touched, error } = meta
  const errorText = touched && error ? error : ''

  return (
    <TextField
      // The helper text prop affects the height of the text field.
      // fix it by passing a space character to the helperText prop
      helperText={errorText || ' '}
      error={!!errorText}
      {...props}
      {...field}
      autoComplete="off"
      variant="standard"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        disableUnderline: true,
      }}
    />
  )
}

export default FormTextInput

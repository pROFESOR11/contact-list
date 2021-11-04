import { Avatar, AvatarProps, Box, Button, makeStyles } from '@material-ui/core'
import { FieldHookConfig, useField } from 'formik'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  avatar: {
    width: '10rem',
    height: '10rem',
    borderColor: theme.palette.secondary.light,
    borderWidth: 2,
    borderStyle: 'solid',
    boxShadow: theme.shadows[10],
  },
}))

// no need to export this logic since we are not planning to use it somewhere else
const fileToBase64 = async (file: File): Promise<string | ArrayBuffer | Error> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (e) => reject(e)
  })

const FormAvatarInput: React.FC<FieldHookConfig<string> & AvatarProps> = (props) => {
  const classes = useStyles()

  const [field, , helpers] = useField(props)
  const { value } = field

  const { setValue } = helpers

  return (
    <div className={classes.root}>
      <Avatar src={value} className={classes.avatar} />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="avatar-upload"
        type="file"
        onChange={async (event) => {
          const base64String = await fileToBase64(event.currentTarget.files[0])

          setValue(base64String as string)
        }}
      />
      <Box mt="1rem">
        <label htmlFor="avatar-upload">
          <Button variant="contained" color="primary" component="span">
            {value === '' ? 'Add Avatar' : 'Change Avatar'}
          </Button>
        </label>
      </Box>
    </div>
  )
}

export default FormAvatarInput

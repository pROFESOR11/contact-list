import { Box } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
    flex: 1,
    flexDirection: 'column',
  },
}))

function Content({ children }: { children: React.ReactNode }): JSX.Element {
  const classes = useStyles()
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Box flex={1}>{children}</Box>
    </Container>
  )
}

export default Content

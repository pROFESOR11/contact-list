import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 0, 5, 0),
  },
}))

function Footer(): JSX.Element {
  const classes = useStyles()
  return (
    <footer className={classes.root} data-test="footer">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="p" variant="h6" align="center" gutterBottom>
          Contact List ©2021
        </Typography>
      </Box>
    </footer>
  )
}

export default Footer

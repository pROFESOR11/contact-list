import AppBar from '@material-ui/core/AppBar'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import HideOnScroll from '@components/HideOnScroll'

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    display: 'flex',
  },
  link: {
    padding: '12px 15px',
    fontWeight: 'bold',
  },
}))

function Header(): JSX.Element {
  const classes = useStyles()

  return (
    <HideOnScroll>
      <AppBar data-test="header" elevation={0} className={classes.appbar}>
        <Toolbar className={classes.toolbar} disableGutters>
          <Link href="/">
            <Typography variant="h5" color="textPrimary" className={classes.link}>
              Contact List
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default Header

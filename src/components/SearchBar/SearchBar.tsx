import { IconButton } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import { alpha, Theme, makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import clsx from 'clsx'
import React, { useCallback, useRef } from 'react'

type SearchBarProps = {
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => void
  onClear: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIconContainer: {
    height: '100%',
    position: 'absolute',
    right: theme.spacing(1),
    top: 0,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'center',
  },

  hidden: {
    visibility: 'hidden',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(6)}px)`,
    paddingRight: `calc(1em + ${theme.spacing(6)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    '&:focus': {
      backgroundColor: alpha(theme.palette.background.paper, 0.55),
    },
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))
const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onChange, onClear }) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement | undefined>(undefined)

  const handleClear = useCallback(() => {
    onClear()
    if (inputRef.current && inputRef.current['value']) {
      inputRef.current['value'] = ''
    }
  }, [onClear])

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <div>
        <InputBase
          inputRef={inputRef}
          placeholder={placeholder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={onChange}
          inputProps={{ 'aria-label': 'search ' }}
        />
      </div>
      <div
        className={clsx({
          [classes.clearIconContainer]: true,
          [classes.hidden]: !inputRef.current?.value,
        })}
      >
        <IconButton onClick={handleClear} color="primary" style={{ backgroundColor: 'transparent' }}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  )
}

export default SearchBar

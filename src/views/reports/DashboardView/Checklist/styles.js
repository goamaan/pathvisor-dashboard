import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: '1em'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  card: {
    width: '100%'
  },
  submit: {
    marginRight: '1em'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
    color: 'black',
    fontSize: 16,
    opacity: 1,
    borderBottom: 0,
    '&:before': {
      borderBottom: 0
    }
  }
}));

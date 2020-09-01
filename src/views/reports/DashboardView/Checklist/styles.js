import { makeStyles } from '@material-ui/core';

export default makeStyles({
  root: {
    marginTop: '3em',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    marginRight: '1em',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    maxWidth: '920px',
  },
});

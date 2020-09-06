import React, { useContext, useState } from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from '../../Providers/UserProvider';
import Loading from 'src/components/Loading';
import Spinner from 'react-spinkit';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  header: {
    marginBottom: theme.spacing(2)
  }
}));

const Files = () => {
  const classes = useStyles();
  const [frameLoad, setFrameLoad] = useState(true);
  const { user, loading, purchaseIDS } = useContext(UserContext);

  if (loading) {
    return <Loading />;
  }

  if (!user && !loading) {
    window.location.href = 'https://dashboard.yourpathvisor.com/login';
    return null;
  }

  if (purchaseIDS.length === 0 && !loading) {
    window.location.href = 'https://dashboard.yourpathvisor.com/404';
    return null;
  }

  return (
    <Page className={classes.root} title="Account">
      <Typography variant="h4" color="initial" className={classes.header}>
        Your Google Drive
      </Typography>
      <Typography variant="caption" color="initial">
        All file uploads by PathVisor are visible here
      </Typography>
      {frameLoad && (
        <Spinner
          className="loading text-center"
          name="circle"
          color="black"
          fadeIn="none"
          style={{ marginTop: '2em' }}
        />
      )}
      <iframe
        src={`https://drive.google.com/embeddedfolderview?id=${user.drive}#list`}
        style={{ width: '60%', height: '600px', border: 0, marginTop: '2em' }}
        onLoad={() => setFrameLoad(false)}
      ></iframe>
    </Page>
  );
};

export default Files;

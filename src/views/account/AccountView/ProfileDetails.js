import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { UserContext } from 'src/Providers/UserProvider';
import { updateData } from '../../../firebase';

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    minWidth: 120,
    margin: theme.spacing(2)
  }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user, loading } = useContext(UserContext);
  const [state, setState] = useState({
    name: user.name,
    course: user.course || '',
    usa: user.usa || false,
    canada: user.canada || false,
    uk: user.uk || false,
    germany: user.germany || false,
    grade: user.grade || 12,
    scholarships: user.scholarships || false,
    board: user.board || ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeChecked = event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const submitName = state.name === user.name ? user.name : state.name;
    let userData = {
      name: submitName,
      email: user.email,
      usa: state.usa,
      canada: state.canada,
      uk: state.uk,
      germany: state.germany,
      course: state.course,
      grade: state.grade,
      scholarships: state.scholarships,
      board: state.board
    };
    updateData(userData, user)
      .then(setMessage('Profile Updated, refresh page to see changes!'))
      .catch(e => setError(`Error - ${e}`));
  };

  if (loading) {
    return null;
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the full name"
                label="Full name"
                name="name"
                onChange={handleChange}
                required
                value={state.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Course/Degree I want to pursue"
                name="course"
                onChange={handleChange}
                required
                value={state.course}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup row>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.grade}
                    name="grade"
                    onChange={handleChange}
                  >
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Board</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.board}
                    name="board"
                    onChange={handleChange}
                  >
                    <MenuItem value={'IB'}>IB</MenuItem>
                    <MenuItem value={'CBSE'}>CBSE</MenuItem>
                    <MenuItem value={'ICSE'}>ICSE</MenuItem>
                    <MenuItem value={'A levels'}>Cambridge A Level</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
            {/* <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                
              </FormControl>
            </Grid> */}
            <Grid item md={12} xs={12}>
              <Typography variant="body1" color="initial">
                Countries I am applying to
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeChecked}
                      checked={state.usa}
                      name="usa"
                    />
                  }
                  label="USA"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeChecked}
                      checked={state.canada}
                      name="canada"
                    />
                  }
                  label="Canada"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeChecked}
                      checked={state.uk}
                      name="uk"
                    />
                  }
                  label="UK"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeChecked}
                      checked={state.germany}
                      name="germany"
                    />
                  }
                  label="Germany"
                />
              </FormGroup>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeChecked}
                      checked={state.scholarships}
                      name="scholarships"
                    />
                  }
                  label="I am actively pursuing scholarships"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

import React, { useState, useContext } from 'react';
import {
  TextField,
  Card,
  Divider,
  CardContent,
  Table,
  TableBody,
  FormGroup,
  Box,
  Button,
  Typography,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'src/Providers/UserProvider';
import { saveNotes } from 'src/firebase';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  notes: {
    padding: theme.spacing(2)
  },
  card: {
    margin: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  submit: {
    marginTop: '1em'
  },
  text: {
    margin: theme.spacing(2)
  }
}));

export default function Notes() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState(user.notes || []);
  const [currentNote, setCurrentNote] = useState('');
  const [error, setError] = useState(null);

  const handleChange = event => {
    setCurrentNote(event.target.value);
  };

  const handleSubmit = event => {
    const num = notes.length + 1;
    const objectToAdd = {
      id: `item-${num}`,
      content: currentNote
    };
    // console.log(notes.concat(objectToAdd));
    setNotes(notes.concat(objectToAdd));
    console.log(num, objectToAdd, notes);
    saveNotes(notes.concat(objectToAdd), user)
      .then(setCurrentNote(''))
      .catch(e => setError(`Error - ${e}`));
  };

  const handleRemove = (event, id) => {
    console.log(event, id);
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
    saveNotes(newNotes, user).catch(e => setError(`Error - ${e}`));
  };

  return (
    <>
      <Typography variant="h1" color="initial" align="center">
        Your Notes
      </Typography>
      {notes.map(note => (
        <Card className={classes.card} key={notes.id}>
          <Typography
            variant="body1"
            color="initial"
            align="justify"
            className={classes.notes}
            key={notes.id}
          >
            {note.content}
          </Typography>
          <IconButton
            aria-label="delete-item"
            onClick={e => handleRemove(e, note.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}
      <Card className={classes.text}>
        <Divider />
        <CardContent className={classes.content}>
          <Table>
            <TableBody>
              <FormGroup>
                <TextField
                  id="outlined-textarea"
                  label="Add your notes here"
                  multiline
                  variant="outlined"
                  value={currentNote}
                  onChange={handleChange}
                />
              </FormGroup>
              <Box display="flex" justifyContent="flex-end">
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                  className={classes.submit}
                >
                  Add
                </Button>
              </Box>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

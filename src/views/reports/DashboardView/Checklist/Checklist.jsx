import React, { useState, useContext } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  IconButton,
  TextField,
  Input,
  Button
} from '@material-ui/core';
import useStyles from './styles';
import defaultChecklist from '../../../../defaultChecklist.json';
import { UserContext } from 'src/Providers/UserProvider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditableChecklist from './EditableChecklist';
import { saveChecklist } from 'src/firebase';
import { Alert } from '@material-ui/lab';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

export default function Checklist() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [checked, setChecked] = useState(
    user.checklist || [
      { name: 'item-1', checked: false, data: 'Attend 1st Session' },
      { name: 'item-2', checked: false, data: 'Complete Profile' },
      { name: 'item-3', checked: false, data: 'Map out your deadlines' }
    ]
  );

  const handleChange = event => {
    const index = checked.findIndex(e => e.name === event.target.name);
    let newArray = [...checked];
    newArray[index] = { ...newArray[index], checked: event.target.checked };
    setChecked(newArray);
  };

  const handleTextChange = event => {
    const index = checked.findIndex(e => e.name === event.target.name);
    let newArray = [...checked];
    newArray[index] = { ...newArray[index], data: event.target.value };
    setChecked(newArray);
  };

  const handleAdd = event => {
    const num = checked.length + 1;
    const objectToAdd = {
      name: `item-${num}`,
      checked: false,
      data: 'New Item'
    };
    console.log(checked.concat(objectToAdd));
    setChecked(checked.concat(objectToAdd));
  };

  const handleRemove = (event, id) => {
    console.log(event, id);
    const newChecklist = checked.filter(item => item.name !== id);
    setChecked(prevState => prevState.filter(item => item.name !== id));
    console.log(checked);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const list = [...checked];
    console.log(list);
    saveChecklist(list, user)
      .then(setMessage('Checklist Updated!'))
      .catch(e => setError(`Error - ${e}`));
  };

  return (
    <Card className={classes.card}>
      <CardHeader title="Checklist" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FormGroup>
              {checked.map((listItem, i) => (
                <TableRow hover>
                  <TableCell
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <EditableChecklist
                      listItem={listItem}
                      handleChange={handleChange}
                      handleTextChange={handleTextChange}
                      handleRemove={handleRemove}
                      id={listItem.name}
                      key={listItem.name}
                    />
                    <IconButton
                      aria-label="add-item"
                      name={listItem.name}
                      onClick={e => handleRemove(e, listItem.name)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </FormGroup>
            <Box display="flex" justifyContent="center">
              <IconButton aria-label="add-item" onClick={handleAdd}>
                <AddCircleIcon />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              {message && <Alert severity="success">{message}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                className={classes.submit}
              >
                Save details
              </Button>
            </Box>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

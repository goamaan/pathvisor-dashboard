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
  Box,
  IconButton,
  TableContainer,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Input
} from '@material-ui/core';
import useStyles from './styles';
import defaultChecklist from '../../../../defaultChecklist.json';
import { UserContext } from 'src/Providers/UserProvider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditableChecklist from './EditableChecklist';
import { saveChecklist } from 'src/firebase';
import { Alert } from '@material-ui/lab';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Edit } from 'react-feather';

export default function Checklist() {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);

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
        {/* <TableContainer component={Paper}>
          <Table size="small">
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
                      style={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}
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
              <TableRow>
                <TableCell
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap'
                  }}
                >
                  <Box display="flex" justifyContent="center">
                    <IconButton aria-label="add-item" onClick={handleAdd}>
                      <AddCircleIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
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
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}
        <List className={classes.root}>
          {checked.map((listItem, i) => (
            <ListItem key={listItem.name} button>
              <ListItemIcon>
                <Checkbox
                  checked={listItem.checked}
                  onChange={handleChange}
                  name={listItem.name}
                  className={classes.display}
                />
              </ListItemIcon>
              <Input
                name={listItem.name}
                defaultValue={listItem.data}
                margin="normal"
                error={listItem.data === ''}
                onChange={handleTextChange}
                disabled={!editMode}
                className={classes.textField}
                multiline
                disableUnderline
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setEditMode(true)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={e => handleRemove(e, listItem.name)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem>
            <ListItemIcon onClick={handleAdd} button>
              <IconButton aria-label="add-item">
                <AddCircleIcon />
              </IconButton>
            </ListItemIcon>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <ListItemSecondaryAction>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                className={classes.submit}
              >
                Save details
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

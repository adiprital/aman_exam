import React, { useState }  from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function DropDown(props) {
    const [contact, setContact] = useState('');
    
    const [name, setName] = useState(''); 
    const [phone, setPhone] = useState(''); 

    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const [edit, setEdit] = useState(false); 

    let allContacts = props.contacts;

    const handleChange = (event) => {
        setContact(event.target.value);
    };

    const openEditContact = () => {
        setEdit(true);
    };

    const closeEditContact = () => {
        setEdit(false);
    };

    const editContact = async () => {
        let currentContact = await axios.post('http://localhost:8000/edit-contact', {
            name,
            phone,
            newName, 
            newPhone
        });

        console.log('edit - currentContact: ', currentContact);
    };

    const deleteContact = async () => {
        let currentContact = await axios.post('http://localhost:8000/remove-contact', {
            name,
            phone
        });
        console.log('delete - currentContact: ', currentContact);
    }


    const checkDisable = () => {
        let res = false;
        if ( newName.length === 0 || newPhone.length === 0 ) {
                res = true;
            } else {
            res = false
        }
        return res;
    };

  return (
    <Box sx={{ minWidth: 120 }}> 
    <h3> Edit Contact</h3>  
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Contacts</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={contact}
                label="Contacts"
                onChange={handleChange}
            >
            { allContacts.map((con, index) => (
                <MenuItem
                    key={`${con}${index}`}
                    value={con.name}
                    onClick={() => {
                        openEditContact();
                        setName(con.name);
                        setPhone(con.phone);
                    }}
              >
                    {con.name} - {con.phone}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
            
            { edit ? <Box sx={{ marginTop: '25px', 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '250px'}}>
                            <Button 
                                variant="contained"
                                onClick={deleteContact}
                            >Remove</Button>
                            <TextField 
                                id='new-name'
                                value={newName}
                                onChange={(event) => setNewName(event.target.value)}                 
                                label="name" 
                                variant="outlined" 
                            />
                            <TextField              
                                id='new-phone'
                                value={newPhone}
                                onChange={(event) => setNewPhone(event.target.value)}                  
                                label="phone" 
                                variant="outlined" 
                            />
                            <Button 
                                variant="contained"
                                disabled={checkDisable()}
                                onClick={editContact}
                            >Edit</Button>
                            <Button 
                                variant="contained"
                                onClick={closeEditContact}
                            >cancel</Button>
                    </Box> : ''
            }
    </Box>
  );
}
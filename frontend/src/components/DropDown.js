import React, { useState }  from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDown(props) {
  const [contact, setContact] = useState('');

  const handleChange = (event) => {
    setContact(event.target.value);
  };

  let allContacts = props.contacts;
  console.log('allContacts: ', allContacts);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Contacts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={contact}
          label="Contacts"
          onChange={handleChange}
        >
            {allContacts.map((con, index) => (
                <MenuItem
                    key={`${con}${index}`}
                >
                    {con.name}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
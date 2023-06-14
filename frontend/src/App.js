import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DropDown from './components/DropDown';

function App() {
  const [contacts, setContacts] = useState([]); 
  const [name, setName] = useState(''); 
  const [phone, setPhone] = useState(''); 

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-contacts');
        if (response && response.data) {
          setContacts(response.data);
        }
      }
      catch(error){
        console.log('error in fetch contacts', error);
      }
    }

    fetchContacts();
  }, []);


  const checkDisable = () => {
    let res = false;
    if ( name.length === 0 || phone.length === 0 ) {
            res = true;
        } else {
        res = false
    }
    return res;
  };

  const addContact = async () => {
    let currentContact = await axios.post('http://localhost:8000/add-contact', {
        name, phone
    });

    if (currentContact.data && currentContact.data.success) {
      let updatedContacts = [...contacts];
      updatedContacts.push(currentContact.data.contact);
      setContacts(updatedContacts);
    }
    // setTimeout(() => {setSignInResult(undefined)}, 5000); message
  }

  const gerContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-contacts');
      if (response && response.data) {
        setContacts(response.data);
      }
    }
    catch(error){
      console.log('error in fetch contacts', error);
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ marginTop: '25px', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '250px',
                marginBottom: '50px'}}>
        <h1>Add New Contact</h1>
        <TextField 
          id='name'
          value={name}
          onChange={(event) => setName(event.target.value)}                 
          label="name" 
          variant="outlined" 
        />
          <TextField              
            id='phone'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}                  
            label="phone" 
            variant="outlined" 
          />
          <Button 
            variant="contained"
            disabled={checkDisable()}
            onClick={addContact}
            >Add Contact</Button>
      </Box>

                { contacts.length !== 0 ? <DropDown contacts={contacts}/> :'' }

                <Button onClick={gerContacts}>Press to refresh</Button>
              
    </Box>
  );
}

export default App;

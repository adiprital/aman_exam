import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DropDown from './components/DropDown';

function App() {
  const [contacts, setContacts] = useState([]); 
  const [name, setName] = useState(''); 
  const [phone, setPhone] = useState([]); 

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

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>

      <DropDown contacts={contacts}/>

      <Box sx={{ marginTop: '25px', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '190px'}}>
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
        >Add Contact</Button>
      </Box>

    </Box>
  );
}

export default App;

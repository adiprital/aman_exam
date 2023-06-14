const express = require('express');
const { getContacts, addContact , removeContact, editContact } = require('../models/contacts.model');

const contactsController = express.Router();

contactsController.get('/get-contacts', async (req, res) => {
    let contacts = await getContacts();
    res.status(200).json(contacts);
});

contactsController.post('/add-contact', async (req, res) => {
    const { name, phone } = req.body;
    const contact = await addContact(name, phone);
    return res.status(200).json(contact);
});

contactsController.post('/remove-contact', async (req, res) => {
    const { name, phone } = req.body;
    const contact = await removeContact(name, phone);
    return res.status(200).json('ok');
});

contactsController.post('/edit-contact', async (req, res) => {
    const { name, phone, newName, newPhone } = req.body;
    const contact = await editContact(name, phone, newName, newPhone );
    return res.status(200).json(contact);
});



module.exports = contactsController;
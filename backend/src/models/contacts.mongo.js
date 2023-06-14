const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

// connects contactsSchema with the "Contacts" collection.
module.exports = mongoose.model('Contacts', contactsSchema);
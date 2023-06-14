const contactsDatabase = require('./contacts.mongo');

async function getContacts() {
    try {
        let allContacts = await contactsDatabase.find({});
        return allContacts;
    } catch(err) {
        console.error(`Could not get contacts ${err}`);
        return [];
    }
};

async function addContact(name, phone) {
    try {
        const contact = await contactsDatabase.findOne({phone});
        if (contact) {
            return {success: false, message: 'contact with this phone already exists'};
        }
        const response = await contactsDatabase.create({
            name,
            phone
        });

        return {success: true, message: 'contact was added successfully.', contact: response };
    } catch (error) {
        console.log(JSON.stringify(error));
        return {success: false, message: `something went wrong ${error}`};
    }
};

async function removeContact(name, phone) {
    try {
        await contactsDatabase.findOneAndDelete({name: name, phone: phone});
    } catch(err) {
        console.error(`Could not remove contacts ${err}`);
    }
};

async function editContact(name, phone, newName, newPhone) {
    try {
        let updatedContact = await contactsDatabase.updateOne({
            name: name, 
            phone: phone
        }, {
            name: newName,
            phone: newPhone
        }, {
            updateOne: true
        });

        return updatedContact;

    } catch(err) {
        console.error(`Could not edit contacts ${err}`);
    }
};


module.exports = {
    getContacts,
    addContact,
    removeContact,
    editContact
}
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

module.exports = {
    getContacts,
    addContact
}
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.error);
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.log(JSON.parse(data).find((data) => data.id == contactId));
  } catch (error) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contact = JSON.parse(data).filter((data) => data.id !== contactId);
    const stringContact = JSON.stringify(contact);
    // console.log(contact);
    await fs.writeFile(contactsPath, stringContact, "utf8");
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = JSON.parse(data);
    const contact = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
    };
    const newData = [];
    newData.push(contact);
    const contacts = [...parseData, ...newData];
    // console.log(...parseData, ...newData);
    const stringContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, stringContacts, "utf8");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

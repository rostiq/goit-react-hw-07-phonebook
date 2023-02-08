import React from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { ADD, REMOVE, FILTER } from '../redux/slice'


const App = () => {

  const dispatch = useDispatch();
  const filtered = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);

  const handleAddContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(ADD(newContact));
  };

  const handleRemoveContact = contactId => {
    dispatch(REMOVE(contactId));
  };

  const handleChangeFilter = event => {
    dispatch(FILTER(event.target.value));
  };

  const handleFilterContacts = () => {

    return contacts.filter(contact => contact.name.toLowerCase().includes(filtered));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <div>All contacts: {contacts.length}</div>
      <Filter value={filtered} onChange={handleChangeFilter} />
      <ContactList
        contacts={handleFilterContacts()}
        onRemoveContact={handleRemoveContact}
      />
    </>
  );
}

export default App;
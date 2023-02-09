import React, { useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER } from '../redux/slice'
import { fetchContacts, addContact, deleteContact } from 'redux/thunk';




const App = () => {
  
  const dispatch = useDispatch();
  
  const filtered = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);

  const handleAddContact = (name, number) => {
    if (contacts.filter(contact => contact.name.toLowerCase().includes(filtered))) {
      alert(`name ${name} already exists`);
      return;
    }
    dispatch(addContact(name, number));
  };

  const handleRemoveContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleChangeFilter = event => {
    dispatch(FILTER(event.target.value));
  };

  const handleFilterContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filtered));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <div>All contacts: {isLoading? '///' :contacts.length}</div>
      <Filter value={filtered} onChange={handleChangeFilter} />
      <ContactList
        contacts={handleFilterContacts()}
        onRemoveContact={handleRemoveContact}
      />
    </>
  );
}

export default App;
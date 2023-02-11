export const selectFilter = state => state.filter;
export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const filteredContacts = state => {
  const contacts = selectContacts(state);

  const filtered = selectFilter(state);

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filtered)
  );
};

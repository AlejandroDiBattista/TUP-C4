import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactList from './ContactList';

function App() {
  const [contactos, setContactos] = useState([
    { id: 1, nombre: 'facu', apellido: 'ledesma', telefono: '3813571959' },
     
  ]);

  const handleDeleteContact = (id) => {
    const updatedContacts = contactos.filter(contact => contact.id !== id);
    setContactos(updatedContacts);
  };

  const handleUpdateContact = (id, updatedContact) => {
    const updatedContacts = contactos.map(contact => {
      if (contact.id === id) {
        return { ...contact, ...updatedContact };
      }
      return contact;
    });
    setContactos(updatedContacts);
  };

  const handleAddContact = (newContact) => {
    setContactos([...contactos, newContact]);
  };

  return (
    <div className="container">
      <h1>Agenda de Contactos</h1>
      <ContactList
        contacts={contactos}
        onDeleteContact={handleDeleteContact}
        onUpdateContact={handleUpdateContact}
        onAddContact={handleAddContact}
      />
    </div>
  );
}

export default App;

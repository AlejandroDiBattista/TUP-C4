import React, { useState } from 'react';
import ContactCard from './ContactCard';

const ContactList = ({ contacts, onDeleteContact, onUpdateContact, onAddContact }) => {
  const [showForm, setShowForm] = useState(false);
  const [newContactData, setNewContactData] = useState({
    nombre: '',
    apellido: '',
    telefono: ''
  });

  const handleAddContact = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddContact({ ...newContactData, id: Date.now() });
    setShowForm(false);
    setNewContactData({ nombre: '', apellido: '', telefono: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContactData({ ...newContactData, [name]: value });
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="nombre" value={newContactData.nombre} onChange={handleInputChange} placeholder="Nombre" required />
          <input type="text" name="apellido" value={newContactData.apellido} onChange={handleInputChange} placeholder="Apellido" required />
          <input type="text" name="telefono" value={newContactData.telefono} onChange={handleInputChange} placeholder="Teléfono" required />
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      ) : (
        <button className="btn btn-primary mb-3" onClick={handleAddContact}>
          Agregar Contacto
        </button>
      )}
      {contacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
          onUpdateContact={onUpdateContact}
        />
      ))}
    </div>
  );
};

export default ContactList;




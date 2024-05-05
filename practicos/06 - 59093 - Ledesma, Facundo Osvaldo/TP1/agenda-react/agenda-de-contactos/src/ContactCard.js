import React, { useState } from 'react';

const ContactCard = ({ contact, onDeleteContact, onUpdateContact }) => {
  const [editing, setEditing] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact });

  const handleDeleteClick = () => {
    onDeleteContact(contact.id);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateContact(contact.id, editedContact);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditedContact({ ...contact });
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {editing ? (
          <>
            <input type="text" name="nombre" value={editedContact.nombre} onChange={handleInputChange} className="form-control mb-2" />
            <input type="text" name="apellido" value={editedContact.apellido} onChange={handleInputChange} className="form-control mb-2" />
            <input type="text" name="telefono" value={editedContact.telefono} onChange={handleInputChange} className="form-control mb-2" />
            <button className="btn btn-success mr-2" onClick={handleSaveClick}>Guardar</button>
            <button className="btn btn-secondary" onClick={handleCancelClick}>Cancelar</button>
          </>
        ) : (
          <>
            <h5 className="card-title">{contact.nombre} {contact.apellido}</h5>
            <p className="card-text">Teléfono: {contact.telefono}</p>
            <button className="btn btn-primary mr-2" onClick={handleEditClick}>Editar</button>
            <button className="btn btn-danger" onClick={handleDeleteClick}>Eliminar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactCard;

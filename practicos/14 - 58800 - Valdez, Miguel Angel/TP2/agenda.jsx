const { useState } = React;

const Contacto = ({ contacto, eliminarContacto, toggleFavorito, editarContacto }) => {
  const [editing, setEditing] = useState(false);
  const [editedContacto, setEditedContacto] = useState({ ...contacto });

  const handleEditar = () => {
    setEditing(true);
  };

  const handleGuardar = () => {
    editarContacto(contacto.id, editedContacto);
    setEditing(false);
  };

  const handleEliminar = () => {
    eliminarContacto(contacto.id);
  };

  const handleToggleFavorito = () => {
    toggleFavorito(contacto.id);
  };

  return (
    <div className="cardBox">
      <div className="card">
        <div className="stylecard">
          <div className="star">
            <i className="fa-solid fa-trash" onClick={handleEliminar}></i>
            <i className="fa-regular fa-pen-to-square" onClick={handleEditar}></i>
            <i className={contacto.favorito ? "fas fa-star favorito" : "far fa-star"} onClick={handleToggleFavorito}></i>
          </div>
          {editing ? (
            <div>
              <input type="text" value={editedContacto.nombre} onChange={(e) => setEditedContacto({ ...editedContacto, nombre: e.target.value })} />
              <input type="text" value={editedContacto.apellido} onChange={(e) => setEditedContacto({ ...editedContacto, apellido: e.target.value })} />
              <input type="text" value={editedContacto.telefono} onChange={(e) => setEditedContacto({ ...editedContacto, telefono: e.target.value })} />
              <button onClick={handleGuardar}>Guardar</button>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 'bold' }}>ID: {contacto.id}</p>
              <p style={{ fontWeight: 'bold' }}>Nombre: {contacto.nombre} </p>
              <p style={{ fontWeight: 'bold' }}>Apellido: {contacto.apellido}</p>
              <p style={{ fontWeight: 'bold' }}>Teléfono: {contacto.telefono}</p>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Agenda = () => {
  const [contactos, setContactos] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '(381) 123-4567', favorito: true },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', telefono: '(381) 123-4567', favorito: false },
    { id: 3, nombre: 'Pedro', apellido: 'Gonzalez', telefono: '(381) 123-4567', favorito: true },
    { id: 4, nombre: 'Ana', apellido: 'Fernandez', telefono: '(381) 123-4567', favorito: false },
    { id: 5, nombre: 'Lucas', apellido: 'Rodriguez', telefono: '(381) 123-4567', favorito: true },
    { id: 6, nombre: 'Carla', apellido: 'Lopez', telefono: '(381) 123-4567', favorito: false },
    { id: 7, nombre: 'Jorge', apellido: 'Diaz', telefono: '(381) 123-4567', favorito: true },
    { id: 8, nombre: 'Luis', apellido: 'Martinez', telefono: '(381) 123-4567', favorito: false },
    { id: 9, nombre: 'Florencia', apellido: 'Paz', telefono: '(381) 123-4567', favorito: true },
    { id: 10, nombre: 'Miguel', apellido: 'Rojas', telefono: '(381) 123-4567', favorito: false },
    { id: 11, nombre: 'Sofia', apellido: 'Acosta', telefono: '(381) 123-4567', favorito: true },
    { id: 12, nombre: 'Carlos', apellido: 'Vera', telefono: '(381) 123-4567', favorito: false },
    { id: 13, nombre: 'Valeria', apellido: 'Gimenez', telefono: '(381) 123-4567', favorito: true },
    { id: 14, nombre: 'Pablo', apellido: 'Sosa', telefono: '(381) 123-4567', favorito: false },
    { id: 15, nombre: 'Romina', apellido: 'Rios', telefono: '(381) 123-4567', favorito: true },
    { id: 16, nombre: 'Ezequiel', apellido: 'Molina', telefono: '(381) 123-4567', favorito: false },
    { id: 17, nombre: 'Agustina', apellido: 'Ortiz', telefono: '(381) 123-4567', favorito: true },
    { id: 18, nombre: 'Matias', apellido: 'Luna', telefono: '(381) 123-4567', favorito: false },
    { id: 19, nombre: 'Cecilia', apellido: 'Carrizo', telefono: '(381) 123-4567', favorito: true },
    { id: 20, nombre: 'Facundo', apellido: 'Paez', telefono: '(381) 123-4567', favorito: false }
  ]);

  const [agregandoContacto, setAgregandoContacto] = useState(false);
  const [nuevoContacto, setNuevoContacto] = useState({ nombre: '', apellido: '', telefono: '' });

  const handleAgregar = () => {
    setAgregandoContacto(true);
  };

  const handleGuardarNuevoContacto = () => {
    agregarContacto(nuevoContacto.nombre, nuevoContacto.apellido, nuevoContacto.telefono);
    setAgregandoContacto(false);
    setNuevoContacto({ nombre: '', apellido: '', telefono: '' });
  };

  const agregarContacto = (nombre, apellido, telefono) => {
    const nuevoContacto = {
      id: Date.now(),
      nombre,
      apellido,
      telefono,
      favorito: false,
    };
    setContactos((prevContactos) => [...prevContactos, nuevoContacto]);
  };

  const eliminarContacto = (id) => {
    setContactos((prevContactos) => prevContactos.filter((contacto) => contacto.id !== id));
  };

  const toggleFavorito = (id) => {
    setContactos((prevContactos) =>
      prevContactos.map((contacto) =>
        contacto.id === id ? { ...contacto, favorito: !contacto.favorito } : contacto
      )
    );
  };

  const editarContacto = (id, editedContacto) => {
    setContactos((prevContactos) =>
      prevContactos.map((contacto) =>
        contacto.id === id ? editedContacto : contacto
      )
    );
  };

  const favoritos = contactos.filter(contacto => contacto.favorito);
  const noFavoritos = contactos.filter(contacto => !contacto.favorito);

  const favoritosOrdenados = favoritos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  const noFavoritosOrdenados = noFavoritos.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <div className="TableCard">
      {agregandoContacto && (
        <div className="newContactForm">
          <input type="text" placeholder="Nombre" value={nuevoContacto.nombre} onChange={(e) => setNuevoContacto({ ...nuevoContacto, nombre: e.target.value })} />
          <input type="text" placeholder="Apellido" value={nuevoContacto.apellido} onChange={(e) => setNuevoContacto({ ...nuevoContacto, apellido: e.target.value })} />
          <input type="text" placeholder="Teléfono" value={nuevoContacto.telefono} onChange={(e) => setNuevoContacto({ ...nuevoContacto, telefono: e.target.value })} />
          <button onClick={handleGuardarNuevoContacto}>Guardar</button>
        </div>
      )}

      <button onClick={handleAgregar}>Agregar Contacto</button>

      <div className="favoritosContainer">
        <h2>Favoritos ({favoritos.length})</h2>
        {favoritosOrdenados.map((contacto) => (
          <Contacto
            key={contacto.id}
            contacto={contacto}
            eliminarContacto={eliminarContacto}
            toggleFavorito={toggleFavorito}
            editarContacto={editarContacto}
          />
        ))}
      </div>

      <div className="noFavoritosContainer">
        <h2>No Favoritos ({noFavoritos.length})</h2>
        {noFavoritosOrdenados.map((contacto) => (
          <Contacto
            key={contacto.id}
            contacto={contacto}
            eliminarContacto={eliminarContacto}
            toggleFavorito={toggleFavorito}
            editarContacto={editarContacto}
          />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(
  <Agenda />,
  document.getElementById("root")
);

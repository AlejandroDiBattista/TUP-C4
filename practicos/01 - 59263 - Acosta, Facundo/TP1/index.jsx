
const Contacto = ({ contacto, eliminarContacto }) => (
  <div>
    <p>{contacto.nombre} - {contacto.telefono}</p>
    <button onClick={eliminarContacto}>Eliminar</button>
  </div>
);

const App = () => {
  const [contactos, setContactos] = React.useState([]);

  const agregarContacto = (nuevoContacto) => {
    setContactos(prevContactos => [...prevContactos, nuevoContacto]);
  };

  const eliminarContacto = (index) => {
    setContactos(prevContactos => prevContactos.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
    const nombre = event.target.nombre.value;
    const telefono = event.target.telefono.value;
    agregarContacto({ nombre, telefono });
    event.target.nombre.value = '';
    event.target.telefono.value = '';
  };

  return (
    <div>
      <h1>Agenda de Contactos</h1>
      <div>
        <h2>Agregar Contacto</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" />
          <input type="text" name="telefono" placeholder="Teléfono" />
          <button type="submit">Agregar</button>
        </form>
      </div>
      <div>
        <h2>Contactos</h2>
        {contactos.map((contacto, index) => (
          <Contacto
            key={index}
            contacto={contacto}
            eliminarContacto={() => eliminarContacto(index)}
          />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

  
const contactos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: "2222" },
    { id: 2, nombre: 'Ana', apellido: 'Gómez', telefono: "22223" },
    { id: 3, nombre: 'Pedro', apellido: 'García', telefono: "22422" },
    { id: 4, nombre: 'Laura', apellido: 'Fernández', telefono: "22262" },
    { id: 5, nombre: 'María', apellido: 'López', telefono: "22252" },
  ]
  
  const Contacto = ({ contacto: { nombre, apellido, telefono } }) => (
    <div className="contact-card">
      <h2>{nombre} {apellido}</h2>
      <p>Teléfono: {telefono}</p>
    </div>
  );
  
  const Agenda = ({ contactos }) => (
    <div className="agenda">
      {contactos.map(c => (
        <Contacto key={c.id} contacto={c} />
      ))}
    </div>
  );
  
  
  
  
  

ReactDOM.render(<Agenda contactos={contactos} />, document.getElementById('root'))
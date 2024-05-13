

const contactos = [
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
    { id: 20, nombre: 'Facundo', apellido: 'Paez', telefono: '(381) 123-4567', favorito: false },
    { id: 21, nombre: 'Pedrito', apellido: 'Paez', telefono: '(381) 123-4567', favorito: false }
  ];
  
  const Contacto = ({ contacto }) => (
    <div className="CardContainer">
      <div className="cardBox">
        <div className="card">
          <div className="stylecard"> 
            
            <div className="star"> 
            <i class="fas fa-phone" id="1"></i>
            <i class="fa-regular fa-star" id="2"></i>
            </div>
            <p style={{ fontWeight: 'bold' }}>ID: {contacto.id}</p>
            <p style={{ fontWeight: 'bold' }}>Nombre: {contacto.nombre} </p>
            <p style={{ fontWeight: 'bold' }}>Apellido: {contacto.apellido}</p>
            <p style={{ fontWeight: 'bold' }}>Teléfono: {contacto.telefono}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  const Agenda = ({ contactos }) => (
    <div className="TableCard">
      {contactos.map((c) => (
        <Contacto key={c.id} contacto={c} />
      ))}
    </div>
  );
  
  ReactDOM.render(
    <Agenda contactos={contactos} />,
    document.getElementById("root")
  );
  
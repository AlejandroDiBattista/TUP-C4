//* Array con Objetos en el cual cada uno de esos objetos se contempla como un Contacto.
const personillas = [
    { id: 1, nombre: "Joaquin", apellido: "Gomez Iturre", telefono: "381617444" },
    { id: 2, nombre: "Juan", apellido: "García", telefono: "+1234567890" },
    { id: 3, nombre: "María", apellido: "López", telefono: "+1987654321" },
    { id: 4, nombre: "Carlos", apellido: "Martínez", telefono: "+1122334455" },
    { id: 5, nombre: "Ana", apellido: "Rodríguez", telefono: "+1555555555" },
    { id: 6, nombre: "Luis", apellido: "Pérez", telefono: "+1777777777" },
  ];
  
  //* Realizamos el componente relacionado a la Persona
  const Persona = ({nombre,apellido,telefono}) => (
       <div className="tarjeta">
       <p>{nombre},{apellido}</p>
       <p>Teléfono 📲:{telefono}</p>
       </div>
  )
  
  const LibretaContactos = () => (
    <div className="agenda">
      {
        personillas.map(personilla => (
          <Persona
            key={personilla.id}
            nombre={personilla.nombre}
            apellido={personilla.apellido}
            telefono={personilla.telefono}
          />
        ))
      }
    </div>
  );
  
  const App = () => (
    <div className="test">
      <LibretaContactos/>
    </div>
  );
  
  
  ReactDOM.render(<App />, document.getElementById("root"));
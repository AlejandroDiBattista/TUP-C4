const contactos = [
  { id: 1, nombre: "Rosario", apellido: "Sanchez", telefono: "381477787" },
  { id: 2, nombre: "Santiago", apellido: "Salazar", telefono: "381529918" },
  { id: 3, nombre: "Miguel", apellido: "Valdez", telefono: "381419283" },
  { id: 3, nombre: "Facundo", apellido: "Ledesma", telefono: "381346781" },
];

const Contacto = ({ contacto }) => (
  <div class="boxesContainer">
    <div class="cardBox">
      <div class="card">
        <div class="front">
          <p>ID: {contacto.id}</p>
          <p>Nombre: {contacto.nombre} </p>
          <p>Apellido: {contacto.apellido}</p>
        </div>
        <div class="back">
          <p>Teléfono: {contacto.telefono}</p>
        </div>
      </div>
    </div>
  </div>
);

const Agenda = ({ contactos }) => (
  <div className="TablaTarjetas">
    {contactos.map((c) => (
      <Contacto key={c.id} contacto={c} />
    ))}
  </div>
);

ReactDOM.render(
  <Agenda contactos={contactos} />,
  document.getElementById("root")
);

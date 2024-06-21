const contactos = [
    { id: 1, nombre: "Bianca", apellido: "del Río", telefono: "3816644080" },
    { id: 2, nombre: "Plastique", apellido: "Tiara", telefono: "3815000001" },
    { id: 3, nombre: "Angel", apellido: "Xoxo", telefono: "3810000001" },
    { id: 4, nombre: "RuPaul", apellido: "Charles", telefono: "3810000002" },
    { id: 5, nombre: "Latrice", apellido: "Royale", telefono: "3810000003" },
    { id: 6, nombre: "Alyssa", apellido: "Edwards", telefono: "3810000004" },
  ];
  
  const ContactCard = ({ contacto }) => (
    <div className="contact-card">
        <h2>{contacto.nombre} {contacto.apellido}</h2>
        <p>Teléfono: {contacto.telefono}</p>
    </div>
);

const App = () => (
    <div>
        <h1>Agenda de Contactos</h1>
        <div className="contact-list">
            {contactos.map(contacto => (
                <ContactCard key={contacto.id} contacto={contacto} />
            ))}
        </div>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
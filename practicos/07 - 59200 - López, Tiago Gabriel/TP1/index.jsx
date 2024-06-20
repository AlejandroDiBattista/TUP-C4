const contactos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '123-456-789' },
    { id: 2, nombre: 'Ana', apellido: 'García', telefono: '987-654-321' },
    { id: 3, nombre: 'María', apellido: 'López', telefono: '555-123-456' },
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

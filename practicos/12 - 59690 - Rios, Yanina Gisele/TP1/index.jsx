const Contacto = ({ contacto }) => (
    <div className="card">
        <div className="card-title">{contacto.nombre} {contacto.apellido}</div>
        <div className="contact">ID: {contacto.id}</div>
        <div className="contact">Teléfono: {contacto.telefono}</div>
    </div>
);

const Agenda = ({ contactos }) => (
    <div className="container">
        <h1>Agenda de Contactos</h1>
        <div className="card-container">
            {contactos.map((c) => (
                <Contacto key={c.id} contacto={c} />
            ))}
        </div>
    </div>
);

const contactos = [
    { id: 1, nombre: "Teresa", apellido: "Juarez", telefono: "38187362" },
    { id: 2, nombre: "Yanina", apellido: "Rios", telefono: "381582738" },
    { id: 3, nombre: "Jose", apellido: "Rivas", telefono: "3818782272" },
    { id: 4, nombre: "Atilio", apellido: "Rios", telefono: "3865282228" },
    { id: 5, nombre: "Juana", apellido: "Salomon", telefono: "3819822782" },
    { id: 6, nombre: "Macarena", apellido: "Bustamante", telefono: "3813872778" },
];

ReactDOM.render(
    <Agenda contactos={contactos} />,
    document.getElementById("root")
);
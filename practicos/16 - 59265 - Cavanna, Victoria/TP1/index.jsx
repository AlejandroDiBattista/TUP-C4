const contactos = [
    {
        "id": 1,
        "nombre": "Lionel",
        "apellido": "Messi",
        "telefono": "+54 9 11 2345 6789"
    },
    {
        "id": 2,
        "nombre": "Ángel",
        "apellido": "Di María",
        "telefono": "+54 9 11 3456 7890"
    },
    {
        "id": 3,
        "nombre": "Dibu",
        "apellido": "Martinez",
        "telefono": "+54 9 11 4567 8901"
    },
    {
        "id": 4,
        "nombre": "Julián",
        "apellido": "Álvarez",
        "telefono": "+54 9 11 5678 9012"
    },
    {
        "id": 5,
        "nombre": "Lautaro",
        "apellido": "Martínez",
        "telefono": "+54 9 11 8901 2345"
    },
    {
        "id": 6,
        "nombre": "Rodrigo",
        "apellido": "De Paul",
        "telefono": "+54 9 11 6789 0123"
    },
    {
        "id": 7,
        "nombre": "Cristian",
        "apellido": "Romero",
        "telefono": "+54 9 11 7890 1234"
    },
    {
        "id": 8,
        "nombre": "Alexis",
        "apellido": "Mac Allister",
        "telefono": "+54 9 11 7781 7896"
    }
]
const Contacto = ({ nombre, apellido, telefono }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h3 className="card-title">{nombre} {apellido}</h3>
                <p className="card-text fw-bold">Teléfono: {telefono}</p>
            </div>
        </div>

    )
}
const Agenda = ({ contactos }) => {
    return (
        <div className="contactos-container d-flex">
            {contactos.map(({ id, nombre, apellido, telefono }) => (
                <Contacto
                    key={id}
                    nombre={nombre}
                    apellido={apellido}
                    telefono={telefono}
                />
            ))}
        </div>
    );
};


const App = () => (
    <div className="agenda-container d-flex">
        <h1 className="title text-center pt-5">Agenda de contactos</h1>
        <Agenda contactos={contactos} />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
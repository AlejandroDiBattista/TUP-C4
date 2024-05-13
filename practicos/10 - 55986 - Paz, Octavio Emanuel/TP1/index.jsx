const contactos = [
    { id: 1, nombre: "Juan", apellido: "Díaz", tel: 3814752316 },
    { id: 2, nombre: "Maria", apellido: "Paz", tel: 3815861498 },
    { id: 3, nombre: "Carla", apellido: "Rubino", tel: 3813456248 },
    { id: 4, nombre: "Pedro", apellido: "Pascal", tel: 3814488124 },
    { id: 5, nombre: "Alejandra", apellido: "Rodriguez", tel: 3815454347 },
    { id: 6, nombre: "Lionel", apellido: "Messi", tel: 3813456248 },
    { id: 7, nombre: "Bejamin", apellido: "Gomez", tel: 3815752949 },
    { id: 8, nombre: "Luisa", apellido: "Toraño", tel: 3814962212 },
    { id: 9, nombre: "Florencia", apellido: "Bernasconi", tel: 3815157964 }
]

const Contacto = ({ contacto }) => (
    <div className="contacto-card">
        <h2>{contacto.nombre} {contacto.apellido}</h2>
        <p>teléfono: {contacto.tel}</p>
    </div>
);

const App = () => (
    <div className="container">
        <h1>Agenda de Contactos</h1>
        <div className="contactos-container">
            {contactos.map(contacto => (
                <Contacto key={contacto.id} contacto={contacto} />
            ))}
        </div>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
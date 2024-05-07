const contactos = [
    {id: 1, nombre: "alvaro", apellido: "medina", telefono: 3816658695},
    {id: 2, nombre: "maximo", apellido: "medina", telefono: 3814875643},
    {id: 3, nombre: "leonardo", apellido: "medina", telefono: 381873453},
    {id: 4, nombre: "cecilia", apellido: "medina", telefono: 3818643274},
    {id: 5, nombre: "carlos", apellido: "medina", telefono: 3812543627},
    {id: 6, nombre: "julieta", apellido: "medina", telefono: 3814374527}
];

const Contacto = ({contacto}) => (
     <div className="card-contacto">
        <h2>Nombre y apellido: {contacto.nombre} {contacto.apellido}</h2>
        <h3>Telefono: {contacto.telefono}</h3>
     </div>
);

const App = () => (
    <div className="contenedor">
        <h1>Agenda de contactos</h1>
        <div className="contenedor-contactos">
            { contactos.map(contacto => (
                <Contacto key={contacto.id} contacto={contacto}/>
            ))}
        </div>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'))
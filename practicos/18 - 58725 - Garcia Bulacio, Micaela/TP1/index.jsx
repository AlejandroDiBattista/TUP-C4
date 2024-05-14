const contactos = [
    { id: 1, nombre: "Micaela", apellido: "Garcia", tel: 38162781923 },
    { id: 2, nombre: "Pedro", apellido: "Ruiz", tel: 38158681926 },
    { id: 3, nombre: "Victoria", apellido: "Cavanna", tel: 38152789235 },
    { id: 4, nombre: "Lionel", apellido: "Messi", tel: 38158681237 },
    { id: 5, nombre: "Facundo", apellido: "Acosta", tel: 38152781926 },
    { id: 6, nombre: "Joaquin", apellido: "Iturre", tel: 38158671928 },
    { id: 7, nombre: "Marcos", apellido: "Garcia", tel: 38152781934 },
    { id: 8, nombre: "Luciano", apellido: "Garcia", tel: 381586819539 },
    { id: 9, nombre: "Veronica", apellido: "Espinosa", tel: 381586819539 },

];

const Contacto = ({ contacto }) => (
    <div className="Tarjeta">
        <h2>{contacto.nombre}, {contacto.apellido}</h2>
        <p>teléfono: {contacto.tel}</p>
    </div>
);

const App = () => {
    return (
        <div className="Agenda">
            <h1>Agenda de Contactos</h1>
            <div className="contactos">
                {contactos.map(contacto => (
                    <Contacto key={contacto.id} contacto={contacto} />
                ))}
            </div>
        </div>
    );
};

contactos.sort((a, b) => {
    if (a.nombre < b.nombre) return -1;
    if (a.nombre > b.nombre) return 1;
    if (a.apellido < b.apellido) return -1;
    if (a.apellido > b.apellido) return 1;
    return 0;
});
ReactDOM.render(<App />, document.getElementById('root'))

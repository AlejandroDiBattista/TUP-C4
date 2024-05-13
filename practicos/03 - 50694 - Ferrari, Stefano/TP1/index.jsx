const contacts = [
  { id: 1, name: "Alejandro", lastName: "Díaz", phone: "123456789" },
  { id: 2, name: "Sofía", lastName: "Martínez", phone: "987654321" },
  { id: 3, name: "Gabriel", lastName: "Hernández", phone: "555666777" },
  { id: 4, name: "Isabella", lastName: "Gómez", phone: "111222333" },
  { id: 5, name: "Emilio", lastName: "Vargas", phone: "444555666" },
  { id: 6, name: "Valentina", lastName: "Sánchez", phone: "777888999" },
];

const Contact = ({ contact }) => {
    const { name, lastName, phone } = contact
    const fullName = `${name} ${lastName}`;

    return(
    <article className="contact">
        <h4>{fullName}</h4>
        <p>Teléfono: {phone}</p>
    </article>
    )
};

const App = () => (
  <section className="section">
    <h1>Agenda:</h1>
    {contacts.map((contact) => (
      <Contact key={contact.id} contact={contact} />
    ))}
  </section>
);

ReactDOM.render(<App/>, document.getElementById("root"));
const contactos = [
    {id:1, nombre: 'Maria', apellido: 'Eugenia', telefono: '65925487'},
    {id:2, nombre: 'Juan', apellido: 'Carlos', telefono: '04468233'},
    {id:3, nombre: 'Jose', apellido: 'Luis', telefono: '82951094'},
    {id:4, nombre: 'Ruben', apellido: 'Aguirre', telefono: '83456123'},
    {id:5, nombre: 'Richard', apellido: 'Parker', telefono: '35155896'},
    {id:6, nombre: 'Andy', apellido: 'Jhonson', telefono: '55085623'},
    {id:7, nombre: 'Bruno', apellido: 'Diaz', telefono: '34345609'}
]

const Contacto = ({nombre, apellido, telefono}) => (
    <div>
        <h2>{nombre} <b>{apellido}</b></h2>
        <p>Telefono: {telefono}</p>
    </div>
) 

const Agenda = ({contactos}) => (
    <div>
        {contactos.map(contacto => (
            <contacto key={contacto.id} nombre={contacto.nombre} apellido={contacto.apellido} telefono={contacto.telefono}></contacto>
        ))}
    </div>
)

const App = () =>  (
    <div>
        <div class="tarjeta">
        <h1>Trabajo Practico</h1>
        <p>¡Hecho con React!</p>
        <h1>Agenda</h1>       
        </div>

        <div class="tarjeta">
        <Contacto nombre="Maria" apellido="Eugenia" telefono="65925487"/>
        </div>

        <div class="tarjeta">
        <Contacto nombre="Juan" apellido="Carlos" telefono="04468233"/>
        </div>
        
        <div class="tarjeta">
        <Contacto nombre="Jose" apellido="Luis" telefono="82951094"/>
        </div>

        <div class="tarjeta">
        <Contacto nombre="Ruben" apellido="Aguirre" telefono="83456123"/>
        </div>

        <div class="tarjeta">
        <Contacto nombre="Richard" apellido="Parker" telefono="35155896"/>
        </div>
        
        <div class="tarjeta">
        <Contacto nombre="Andy" apellido="Jhonson" telefono="55085623"/>
        </div>

        <div class="tarjeta">
        <Contacto nombre="Bruno" apellido="Diaz" telefono="34345609"/>
        </div>
    </div>  
)
  
ReactDOM.render(<App />, document.getElementById('root'))
const { useState, useEffect } = React;

const productosIniciales = [
    { id: 1, nombre: 'Cafe', codigo: '7799875443216', cantidad: 7, editando: false },
    { id: 2, nombre: 'Yerba', codigo: '7798234567895', cantidad: 12, editando: false },
    { id: 3, nombre: 'Mermelada', codigo: '7795481632458', cantidad: 5, editando: false },
    { id: 4, nombre: 'Alfajor', codigo: '7799548216794', cantidad: 6, editando: false },
    { id: 5, nombre: 'Torta', codigo: '7793254217361', cantidad: 6, editando: false },
    { id: 6, nombre: 'Helado', codigo: '7796543219883', cantidad: 4, editando: false }
];

function Agenda({ productos, editar, cancelarEdicion, borrar, agregar, agregarCant }) {
    if (productos.length === 0) {
        return (
            <div className="Productos0">
                <h1>No hay productos</h1>
                <button className="agregarProd"><i className="fas fa-plus" onClick={agregar}></i></button>
            </div>
        )
    }

    function ordenAlfabetico(a, b) {
        if (a.nombre < b.nombre) return -1;
        if (a.nombre > b.nombre) return 1;
        return 0;
    }
    productos.sort(ordenAlfabetico);
    return (
        <div className="agenda">
            <div className="titulo">
                <h1>Control Depósito</h1>
                <button className="agregarProd"><i className="fas fa-plus" onClick={agregar}></i></button>
            </div>
            {productos.map(producto => (
                <div key={producto.id}>
                    {producto.editando
                        ?
                        <EditarAgenda
                            producto={producto}
                            productos={productos}
                            guardar={(p) => editar(p)}
                            cancelar={() => cancelarEdicion(producto)}
                        />
                        :<Mostrar
                            producto={producto}
                            editar={() => editar({ ...producto, editando: true })}
                            borrar={() => borrar(producto)}
                            agregarCant={() => agregarCant(producto)}
                        />
                    }
                </div>
            ))}
        </div>
    );
}

function Mostrar({ producto, editar, borrar, agregarCant }) {
    const handleClick = (e) => {
        e.stopPropagation();
        agregarCant();
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        editar();
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        borrar();
    };

    return (
        <div className="card" onClick={handleClick}>
            <span className="cantidad">{producto.cantidad}</span>
            <div>
                <p className="nombre"><strong>{producto.nombre}</strong></p>
                <p className="codigo">{producto.codigo}</p>
            </div>
            <div className="botones-mostrar">
                <div><i class="fa-regular fa-pen-to-square" onClick={handleEditClick}></i></div>
                <div><i class="fa-regular fa-trash-can" onClick={handleDeleteClick}></i></div>
            </div>
        </div>
    );
}

function EditarAgenda({ producto, productos, guardar, cancelar }) {
    const [nombre, setNombre] = useState(producto.nombre);
    const [codigo, setCodigo] = useState(producto.codigo);
    const [cantidad, setCantidad] = useState(producto.cantidad);
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);

    const cambiarNombre = (e) => {
        setNombre(e.target.value);
        setError(false);
    };
    const cambiarCodigo = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); 
        setCodigo(inputValue);
        setError(false);
        setError3(false);
        setError4(false);
        if (codigo.length > 12) return setCodigo(codigo.substring(0, codigo.length - 1))
    };

    const cambiarCantidad = (e) => {
        setCantidad(e.target.value);
        setError(false);
        setError2(false);
        if (parseInt(cantidad) <= 0) return setCantidad(1);
    };
    const CodigoDuplicado = (codigo) => {
        return productos.some(p => p.codigo === codigo && p.id !== producto.id);
    };
    const guardarProducto = (e) => {
        e.preventDefault();
        if (nombre.trim() === '' || codigo.trim() === '' || cantidad === '') {
            setError(true);
            return;
        }
        if (parseInt(cantidad) < 0) {
            setError2(true);
            return;
        }
        if (codigo.length < 13) {
            setError3(true);
            return;
        }
        if (CodigoDuplicado(codigo)) {
            setError4(true);
            return;
        }
        guardar({ ...producto, nombre, codigo, cantidad, editando: false });
    };
    const cancelarEdicion = (e) => {
        e.preventDefault();
        cancelar();
    };
    return (
        <div className="card2">
            <form>
                <div className="input-1">
                    <div className="input-2">
                        <div><input type="text" placeholder="Producto" onChange={cambiarNombre} value={nombre} /></div>
                        <div><input type="text" placeholder="codigo" onChange={cambiarCodigo} value={codigo} /></div>
                        <div><input type="number" placeholder="cantidad" onChange={cambiarCantidad} value={cantidad} /></div>
                    </div>
                </div>
                <div className="edit-buttons">
                    <div className="bt1"><button className="btn" onClick={guardarProducto}>Aceptar</button></div>
                    <div><button className="btn1" onClick={cancelarEdicion}>Cancelar</button></div>
                </div>
            </form>
            {error && <p className="errores">Completa todos los campos</p>}
            {error2 && <p className="errores2">No pueden haber valores negativos</p>}
            {error3 && <p className="errores2">El codigo EAR debe tener 13 digitos</p>}
            {error4 && <p className="errores2">El codigo EAR ya existe</p>}
        </div>
    );
}

function App() {
    const [productos, setProductos] = useState(() => {
        const savedProductos = localStorage.getItem('productos');
        return savedProductos ? JSON.parse(savedProductos) : productosIniciales;
    });

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    const editar = (producto) => {
        setProductos(productos.map(p => p.id === producto.id ? producto : p));
    };

    const cancelarEdicion = (producto) => {
        if (producto.nombre === '' && producto.codigo === '' && producto.cantidad === '') {
            borrar(producto);
        } else {
            setProductos(productos.map(p => p.id === producto.id ? { ...p, editando: false } : p));
        }
    };

    const borrar = (producto) => {
        setProductos(productos.filter(p => p.id !== producto.id));
    };

    const idNuevo = () => {
        let ids = [...productos].map(p => p.id);
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    };

    const agregar = () => {
        const nuevoProducto = { id: idNuevo(), nombre: '', codigo: '', cantidad: '', editando: true };
        setProductos([...productos, nuevoProducto]);
    };

    const agregarCant = (producto) => {
        setProductos(productos.map(p => p.id === producto.id ? { ...producto, cantidad: parseInt(producto.cantidad) + 1 } : p));
    };

    return (
        <div>
            <Agenda
                productos={productos}
                editar={editar}
                cancelarEdicion={cancelarEdicion}
                borrar={borrar}
                agregar={agregar}
                agregarCant={agregarCant}
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

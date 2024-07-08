const { useState, useEffect } = React;

const productosIniciales = [
    { id: 1, nombre: 'Cafe', codigo: '7799875443216', cantidad: 7, editando: false },
    { id: 2, nombre: 'Yerba', codigo: '7798234567895', cantidad: 12, editando: false },
    { id: 3, nombre: 'Mermelada', codigo: '7795481632458', cantidad: 5, editando: false },
    { id: 4, nombre: 'Alfajor', codigo: '7799548216794', cantidad: 6, editando: false },
    { id: 5, nombre: 'Torta', codigo: '7793254217361', cantidad: 6, editando: false },
    { id: 6, nombre: 'Helado', codigo: '7796543219883', cantidad: 4, editando: false }
];

function Agenda({ productos, editar, cancelarEdicion, borrar, agregarCant, agregarProducto }) {
    const ordenarAlfabeticamente = (productos) => {
        return productos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    };

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const mostrarFormularioHandler = () => {
        setMostrarFormulario(true);
    };

    const cancelarAgregar = () => {
        setMostrarFormulario(false);
    };

    return (
        <div className="agenda">
            <div className="titulo">
                <h1>Control Depósito</h1>
                {!mostrarFormulario && (
                    <button className="agregarProd" onClick={mostrarFormularioHandler}>
                        <i className="fas fa-plus"></i>
                    </button>
                )}
            </div>
            {mostrarFormulario && (
                <AgregarProducto
                    cancelarAgregar={cancelarAgregar}
                    agregarProducto={agregarProducto}
                    productos={productos}
                />
            )}
            {ordenarAlfabeticamente(productos).map(producto => (
                <div key={producto.id}>
                    {producto.editando ? (
                        <EditarAgenda
                            producto={producto}
                            productos={productos}
                            guardar={p => editar(p)}
                            cancelar={() => cancelarEdicion(producto)}
                        />
                    ) : (
                        <Mostrar
                            producto={producto}
                            editar={() => editar({ ...producto, editando: true })}
                            borrar={() => borrar(producto)}
                            agregarCant={() => agregarCant(producto)}
                        />
                    )}
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
                <div><i className="far fa-edit" onClick={handleEditClick}></i></div>
                <div><i className="far fa-trash-alt" onClick={handleDeleteClick}></i></div>
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
    const [error5, setError5] = useState(false);

    const cambiarNombre = (e) => {
        setNombre(e.target.value);
        setError(false);
        setError4(false);
    };

    const cambiarCodigo = (e) => {
        const value = e.target.value;
        setCodigo(value);
        setError(false);
        setError3(false);
        setError5(false);
        if (value.length > 13) {
            setCodigo(value.substring(0, 13));
        }
    };

    const cambiarCantidad = (e) => {
        const value = parseInt(e.target.value);
        setCantidad(value);
        setError(false);
        setError2(false);
        if (value < 0) {
            setCantidad(0);
        }
    };

    const CodigoDuplicado = (codigo) => {
        return productos.some(p => p.codigo === codigo && p.id !== producto.id);
    };

    const NombreDuplicado = (nombre) => {
        return productos.some(p => p.nombre === nombre && p.id !== producto.id);
    };

    const guardarProducto = (e) => {
        e.preventDefault();
        if (nombre.trim() === '' || codigo.trim() === '' || cantidad === '') {
            setError(true);
            return;
        }
        if (cantidad < 0) {
            setError2(true);
            return;
        }
        if (codigo.length !== 13) {
            setError3(true);
            return;
        }
        if (NombreDuplicado(nombre)) {
            setError4(true);
            return;
        }
        if (CodigoDuplicado(codigo)) {
            setError5(true);
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
            <form onSubmit={guardarProducto}>
                <div className="input-1">
                    <div className="input-2">
                        <input type="text" placeholder="Producto" onChange={cambiarNombre} value={nombre} />
                        <input type="text" placeholder="Código" onChange={cambiarCodigo} value={codigo} />
                        <input type="number" placeholder="Cantidad" onChange={cambiarCantidad} value={cantidad} />
                    </div>
                </div>
                <div className="edit-buttons">
                    <button type="submit" className="btn-custom">Aceptar</button>
                    <button type="button" className="btn-custom-cancel" onClick={cancelarEdicion}>Cancelar</button>
                </div>
            </form>
            {error  && <p className="errores">Completa todos los campos</p>}
            {error2 && <p className="errores2">No pueden haber valores negativos</p>}
            {error3 && <p className="errores2">El código debe tener 13 dígitos</p>}
            {error4 && <p className="errores2">El producto ya existe</p>}
            {error5 && <p className="errores2">El código ya existe</p>}
        </div>
    );
}
function AgregarProducto({ cancelarAgregar, agregarProducto, productos }) {
    const [nuevo, setNuevo] = useState({ nombre: '', codigo: '', cantidad: '' });
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);

    const handleCampo = (e) => {
        const { name, value } = e.target;
        setNuevo({ ...nuevo, [name]: value });
    };

    const ultimoId = () => {
        return Math.max(...productos.map((product) => product.id), 0) + 1;
    };

    const agregarProductoNuevo = (e) => {
        e.preventDefault();
        if (nuevo.nombre && nuevo.codigo && nuevo.cantidad) {
            if (/^\d{13}$/.test(nuevo.codigo.replace(/\s/g, ''))) {
                if (!NombreDuplicado(nuevo.nombre) && !CodigoDuplicado(nuevo.codigo)) {
                    agregarProducto({ id: ultimoId(),  ...nuevo, cantidad: parseInt(nuevo.cantidad)});
                    setNuevo({ nombre: '', codigo: '', cantidad: '' });
                    setError(false);
                    setError2(false);
                    setError3(false);
                    cancelarAgregar();
                } else {
                    setError3(true); 
                }
            } else {
                setError2(true); 
            }
        } else {
            setError(true); 
        }
    };

    const cancelar = () => {
        setNuevo({ nombre: '', codigo: '', cantidad: '' });
        cancelarAgregar();
    };

    const CodigoDuplicado = (codigo) => {
        return productos.some(p => p.codigo === codigo);
    };

    const NombreDuplicado = (nombre) => {
        return productos.some(p => p.nombre === nombre);
    };

    return (
        <div className="form-agregar">
            <form onSubmit={agregarProductoNuevo}>
                <input type="text" name="nombre" placeholder="Producto" value={nuevo.nombre} onChange={handleCampo} />
                <input type="text" name="codigo" placeholder="Código" value={nuevo.codigo} maxLength={13} onChange={handleCampo} />
                <input type="number" name="cantidad" placeholder="Cantidad" value={nuevo.cantidad} min={0} onChange={handleCampo} />
                <div className="edit-buttons">
                    <button type="submit" className="btn-custom">Agregar</button>
                    <button type="button" className="btn-custom-cancel" onClick={cancelar}>Cancelar</button>
                </div>
            </form>
            {error && <p className="errores">Completa todos los campos</p>}
            {error2 && <p className="errores2">El código debe tener 13 dígitos numéricos</p>}
            {error3 && <p className="errores2">El producto o código ya existe</p>}
        </div>
    );
}

function Principal() {
    const [productos, setProductos] = useState(() => {
        const productosGuardados = localStorage.getItem('productos');
        return productosGuardados ? JSON.parse(productosGuardados) : productosIniciales;
    });

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    const editar = (productoActualizado) => {
        setProductos(productos.map(producto =>
            producto.id === productoActualizado.id ? productoActualizado : producto
        ));
    };

    const cancelarEdicion = (producto) => {
        setProductos(productos.map(p =>
            p.id === producto.id ? { ...p, editando: false } : p
        ));
    };

    const borrar = (producto) => {
        setProductos(productos.filter(p => p.id !== producto.id));
    };

    const agregarCant = (producto) => {
        setProductos(productos.map(p =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        ));
    };

    const agregarProducto = (nuevoProducto) => {
        setProductos([...productos, nuevoProducto]);
    };

    return (
        <div className="principal">
            <Agenda
                productos={productos}
                editar={editar}
                cancelarEdicion={cancelarEdicion}
                borrar={borrar}
                agregarCant={agregarCant}
                agregarProducto={agregarProducto}
            />
        </div>
    );
}

ReactDOM.render(<Principal />, document.getElementById('root'));
const saludar = (req, res) => {
    console.log(req.query)
    const { nombre, apellido } = req.query;
    res.send(`<h1>Hola, ¿cómo estás ${nombre}?</h1>`);
}

const saludarNombre = (req, res) => {
    console.log(req.params)
    const { nombre } = req.params;
    res.send(`<h1>Hola, ¿cómo estás ${nombre}?</h1>`);
}

const Prueba = {
    saludar,
    saludarNombre
}

export {Prueba} 

async function traer(camino, metodo='GET', body = {}) {
    let res = await fetch(camino,
        {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    let data = await res.text()
    return data 
}

async function listar() {
    let data = await traer('/usuarios')
    setMensaje(data)
}   

async function registrar() {      
    let usuario = {
        username: "adibattista",
        password: "4321"
    }
    let data = traer('/registrar', 'POST', usuario)
    setMensaje(data)
}

async function login() {
    let usuario = {
        username: "adibattista",
        password: "4321"
    }
    let data = traer('/login', 'POST', usuario)
    setMensaje(data)
}

async function logout() {
    let data = traer('/logout', 'PUT')
    setMensaje(data)
}

async function info() {
    let data = traer('/info')
    setMensaje(data)
}

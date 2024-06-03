function Telefono({ numero, tipo }){
    return `<p>${numero} (${tipo})</p>`
}

function Domicilio({ calle, numero, localidad }){
    return `<p>${calle} ${numero} (${localidad})</p>`
}

function Persona({ nombre, apellido, telefonos, domicilios }){
    return `
        <h2>${nombre} <b>${apellido}</b></h2>
        ${telefonos &&  `
        <ul>
            <h3>Teléfonos</h3>
            ${telefonos.map(telefono => `<li>${Telefono(telefono)}</li>`).join('')}
        </ul>`}
        ${domicilios.length && `
        <ul>
            <h3>Domicilios</h3>
            ${domicilios.map(domicilio => `<li>${Domicilio(domicilio)}</li>`).join('')}
        </ul>`}
    `
}

let persona = {
    nombre: 'Juan',
    apellido: 'Perez',
    telefonos: [
        {numero: '3814123456', tipo: 'casa'},
        {numero: '3814123457', tipo: 'celular'}
    ],
    domicilios: [
        {calle: 'Mendoza', numero: 1234, localidad: 'SM de Tucumán'},
        {calle: 'Av. Alem', numero: 5678, localidad: 'SM de Tucumán'}
    ]
};

console.log(Persona(persona));
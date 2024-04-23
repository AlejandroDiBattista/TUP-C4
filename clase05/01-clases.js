class Contacto {
    constructor(nombre, apellido, email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefonos = [];
        this.domicilios = [];
    }
    agregarTelefono(telefono) {
        this.telefonos.push(telefono);
    }
    get tieneTelefono(){
        return this.telefonos.length > 0;
    }
    agregarDomicilio(domicilio) {
        this.domicilios.push(domicilio);
    }
    get tieneDomicilio(){
        return this.domicilios.length > 0;
    }

    toString() {
        let texto = `${this.nombre} ${this.apellido}\n`;
        if(this.tieneTelefono){
            texto += "Telefonos:\n";
            this.telefonos.forEach(telefono => {
                texto += `- ${telefono}\n`;
            });
        }
        if(this.tieneDomicilio){
            texto += "Domicilios:\n";
            this.domicilios.forEach(domicilio => {
                texto += `- ${domicilio}\n`;
            });
        }
        return texto;
    }

    render(){
        let html = `<div>${this.nombre} ${this.apellido}</div>\n`;
        if(this.telefonos.length > 0){
            html += "<ul>\n"
            html += "   <h3>Telefonos:</h3>\n";
            html += this.telefonos.map(telefono => `   <li>${telefono.render()}</li>\n`).join('\n');
            html += "</ul>\n"
        if(this.domicilios.length > 0){
            html += "<ul>\n"
            html += "  <h3>Domicilios:</h3>\n";
            html += this.domicilios.map(domicilio => `   <li>${domicilio.render()}</li>`).join("\n");
            html += "</ul>\n";
        }
        }
        return html;
    }
}

class Telefono {
    constructor(numero, tipo = "celular") {
        this.numero = numero;
        this.tipo = tipo;
    }
    toString() {
        return `${this.numero} - ${this.tipo}`;
    }
    render(){
        return `<div>${this.numero} - ${this.tipo}</div>`;
    }
}

class Domicilio {
    constructor(calle, numero, localidad = "SM de Tucumán") {
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
    }
    toString() {
        return `${this.calle} ${this.numero} - ${this.localidad}`;
    }
    render(){
        return `<div>${this.calle} ${this.numero} - ${this.localidad}</div>`;
    }
}

let contacto = new Contacto("Juan", "Perez")
let telefono = new Telefono("3811234567")
contacto.agregarTelefono(telefono)
contacto.agregarTelefono(new Telefono("3817654321", "fijo"))
contacto.agregarDomicilio(new Domicilio("Calle 1", 123))
contacto.agregarDomicilio(new Domicilio("Calle 2", 456, "Yerba Buena"))

console.log(contacto.render())

contacto.telefonos[2].numero = "3819876543"
contacto.domicilios[1].localidad = "San Miguel de Tucumán"
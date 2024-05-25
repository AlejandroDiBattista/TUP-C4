let persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30, 

    nombreCompleto: function(){
        return `${this.nombre} ${this.apellido}`
    },
    toString: function(){
        return `
        PERSONA
        nombre: ${this.nombre}
        apellido: ${this.apellido}
        edad: ${this.edad}
        ` 
    }
}

// Internamente ${persona} invoca a persona.toString()
console.log(`persona: ${persona}`)

let a = new Date()
a.getFullYear 
a.getHours 

let b = new Date(1967,12,5)
b.getHours
b.getMonth

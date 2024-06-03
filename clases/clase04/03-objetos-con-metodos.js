let juan = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30, 
    nombreCompleto: function(){
        return `${this.nombre} ${this.apellido}`
    },
    toString: function(){
        return `
        nombre: ${this.nombre}
        apellido: ${this.apellido}
        edad: ${this.edad}
        ` 
    }
}

// Los objetos son un conjunto de propiedades y metodos (funciones)

juan.nombreCompleto()
juan.nombre 

// nombreCompleto(juan)
// Todo en JavaScript es un objeto
// (y todos los objetos tienen un metodo toString)
(100).toString()        //> "100"
true.toString()         //> "true"
[1, 2, 3].toString()    //> "1,2,3"

juan.toString()

nombreCompleto({nombre: "Maria", apellido: "De las nieve"})
// Maria De las nieves

// Las cadenas de texto son objetos
let saluda = "Hola"
saluda.toUpperCase()
saluda.length
saluda.includes("o")

console.log(otroNombre)

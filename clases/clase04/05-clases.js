class Persona {
    constructor(nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = 18
    }

    cumplirAños(){
        this.edad += 1 
    }
    toString(){
        return this.nombre + this.apellido + this.edad
    }

}

let d = new Date(2000,1,1)


let a = new Persona("Juan", "Perez")
a.cumplirAños()
console.log(a.toString())



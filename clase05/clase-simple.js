class Punto2D {
    #x = 0;
    #y = 0; 
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x(){ return this.#x }
    get y(){ return this.#y }

    set x(valor){ 
        if(valor < 0) return
        this.#x = valor 
    }

    get longitud() {
        return Math.sqrt(this.#x ** 2 + this.#y ** 2);
    }

    distancia(otro){
        return Math.sqrt((this.#x - otro.#x) ** 2 + (this.#y - otro.#y) ** 2);#
    }

    desplazar(dx, dy){
        return new Punto2D(x + dx, y + dy);
    }
}

class Punto3D extends Punto2D {
    constructor(x, y, z){
        super(x, y);
        this.#z = z;
    }

    get longitud(){
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.#z ** 2);
    }
}

let p = new Punto2D(3, 4)
let a = new Punto2D(5, 2)

let b = p.desplazar(10, 20)


p.x = 100
p.x = -50 

console.log(p.longitud); // 5
console.log(p.distancia(a)); // 2.828427124746190
let numeros = [1, 2, 3, 4, 5];
let suma = 0;
for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
}
console.log(suma);

// Usar for of 
suma = 0;
for (let numero of numeros) {
    suma += numero;
}
console.log(suma);

// Usar forEach
suma = 0;
numeros.forEach(numero => {
    suma += numero;
});

console.log(suma);

// Usar reduce
suma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);


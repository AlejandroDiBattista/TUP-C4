
function subirCondicionC4() {
    let datos = [1, 4, 4, 4, 4, 4, 1, 1, 4, 4, 2, 4, 4, 4, 4, 2, 4, 1]
    let estados = document.querySelectorAll('select[name="nota"]');
    if (datos.length != estados.length) {
        alert('Error en la cantidad de alumnos >> Alumnos: ' + datos.length + 'Condiciones: ' + estados.length);
    } else {
        estados.forEach((estado, index) => estado.selectedIndex = datos[index]);
    }
}

function subirNotaC4() {
    let datos = [1, 10, 10, 10, 9, 10, 1, 1, 10, 10, 6, 9, 10, 9, 10, 8, 10, 1]
    let notas = document.querySelectorAll('input[name="nota"]');
    if (datos.length != notas.length) {
        alert('Error en la cantidad de alumnos >> Alumnos: ' + datos.length + 'Notas: ' + notas.length);
    } else {
        notas.forEach((nota, index) => nota.value = datos[index]);
    }
}

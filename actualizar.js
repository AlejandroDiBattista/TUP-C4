function cambiarCondicionC4() {
    let datos = [1, 4, 4, 4, 4, 4, 1, 1, 4, 4, 2, 4, 4, 4, 4, 2, 4, 1]
    let estados = document.querySelectorAll('select[name="nota"]');
    estados.forEach((estado, index) => estado.selectedIndex = datos[index]);
}

function cambiarNotaC4() {
    let datos = [0, 10, 10, 10, 9, 10, 0, 0, 10, 10, 0, 9, 10, 9, 10, 0, 10, 0]
    let notas = document.querySelectorAll('input[name="nota"]');
    notas.forEach((nota, index) => nota.value = datos[index]);
}


document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.getElementById('logout-button');
    
    logoutButton.addEventListener('click', function() {
        fetch('/api/logout', {
            method: 'GET',
            credentials: 'same-origin' // Incluye las cookies en la solicitud
        })
        .then(response => {
            if (response.ok) {
                // Redirige al usuario a la página de inicio de sesión u otra página
                window.location.href = '/';
            } else {
                console.error('Error al cerrar sesión');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud de cerrar sesión:', error);
        });
    });
});

// Obtener elementos del DOM
const usernameElement = document.getElementById('username');
const userRoleElement = document.getElementById('user-role');
const logoutButton = document.getElementById('logout-btn');

// Datos de ejemplo del usuario
const usuario = {
    nombre: sessionStorage.getItem('username'),
    rol: sessionStorage.getItem('role'),
};

// Actualizar los datos del usuario en la página
usernameElement.textContent = usuario.nombre;
userRoleElement.textContent = usuario.rol;

// Evento para cerrar sesión
logoutButton.addEventListener('click', async () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');

    try {
        const httpService = new HttpService();
        await httpService.get('/api/auth/logout');

        window.location.href = '/';
    } catch (error) {
      console.info(error);
    }
});

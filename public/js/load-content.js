// Obtener elementos del DOM
const usernameElement = document.getElementById('username');
const userRoleElement = document.getElementById('user-role');
const logoutButton = document.getElementById('logout-btn');
const menu = document.getElementsByClassName('menu')[0];

// Current user data
const { username, role } = {
    username: sessionStorage.getItem('username'),
    role: sessionStorage.getItem('role'),
};

// Custom page for current user
usernameElement.textContent = username;
userRoleElement.textContent = role;

// On DOM load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.content #username').innerText = username;
    document.querySelector('.content #user-role').innerText = role;

    if (role === 'Administrador') {
        const newLi = document.createElement('li');
        const adminPanel = document.createElement('a');

        adminPanel.textContent = 'Panel de Administración';
        adminPanel.setAttribute('href', '/admin-panel');

        menu.appendChild(newLi);
        newLi.appendChild(adminPanel);
    }


    
});

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

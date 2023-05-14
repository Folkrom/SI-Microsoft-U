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
document.addEventListener('DOMContentLoaded', async () => {
    const { pathname } = window.location;

    if (pathname === '/dashboard') {
        document.querySelector('.content #username').innerText = username;
        document.querySelector('.content #user-role').innerText = role;
    }

    if (role === 'Administrador') {
        const usersPanel = createMenuItem('Usuarios', '/users-panel');
        const rolesPanel = createMenuItem('Roles', '/roles-panel');

        menu.appendChild(usersPanel);
        menu.appendChild(rolesPanel);

        if (pathname === '/users-panel') {
            loadUsers();
        }

        if (pathname === '/roles-panel') {
            loadRoles();
        }
    }

    if (role === 'CEO') {
        const employeesPanel = createMenuItem('Empleados', '/employees-panel');
        const certificationsPanel = createMenuItem(
            'Certificaciones',
            '/certifications-panel'
        );
        const marketPanel = createMenuItem('Mercado', '/market-panel');
        // const ISPPanel = createMenuItem('Roles', '/roles-panel');

        menu.appendChild(employeesPanel);
        menu.appendChild(certificationsPanel);
        menu.appendChild(marketPanel);
        // menu.appendChild(ISPPanel);

        if (pathname === '/employees-panel') {
            loadEmployees();
        }

        if (pathname === '/certifications-panel') {
            loadCertifications();
        }

        if (pathname === '/market-panel') {
            loadMarket();
        }
    }
});

const createMenuItem = (text, href) => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    link.textContent = text;
    link.setAttribute('href', href);

    li.appendChild(link);

    return li;
};

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

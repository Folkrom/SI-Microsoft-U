// Obtener elementos del DOM
const getElement = (id) => document.getElementById(id);
const createMenuItem = (text, href) => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    link.textContent = text;
    link.setAttribute('href', href);

    li.appendChild(link);

    return li;
};

// Elementos del DOM
const usernameElement = document.getElementById('username');
const userRoleElement = document.getElementById('user-role');
const logoutButton = document.getElementById('logout-btn');
const menu = document.getElementsByClassName('menu')[0];

// Datos del usuario actual
const { username, role } = {
    username: sessionStorage.getItem('username'),
    role: sessionStorage.getItem('role'),
};

// Página personalizada para el usuario actual
usernameElement.textContent = username;
userRoleElement.textContent = role;

const { pathname } = window.location;

if (pathname === '/dashboard') {
    document.querySelector('.content #username').innerText = username;
    document.querySelector('.content #user-role').innerText = role;
}

// Función para cargar los elementos del menú según el rol
const loadMenuItems = (items) => {
    for (const item of items) {
        const menuItem = createMenuItem(item.text, item.href);
        menu.appendChild(menuItem);
    }
};

// Cargar elementos del menú según el rol
const loadRoleMenu = async () => {
    if (role === 'Administrador') {
        const adminItems = [
            { text: 'Usuarios', href: '/users-panel' },
            { text: 'Roles', href: '/roles-panel' },
        ];
        loadMenuItems(adminItems);
        if (pathname === '/users-panel') {
            await loadUsers();
        }
        if (pathname === '/roles-panel') {
            await loadRoles();
        }
    }

    if (role === 'CEO') {
        const ceoItems = [
            { text: 'Directores', href: '/chiefs-panel' },
            { text: 'Mercado', href: '/market-panel' },
            { text: 'Inmuebles', href: '/estate-panel' },
            { text: 'Clientes', href: '/customers-panel' },
            { text: 'Empleados', href: '/employees-panel' },
            { text: 'Certificaciones', href: '/certifications-panel' },
            { text: 'Informacion ISP', href: '/isp-info-panel' },
            { text: 'Solicitudes de ISP', href: '/isp-requests-panel' },
            { text: 'Materias Primas', href: '/raw-materials-panel' },
            { text: 'Proveedores', href: '/providers-panel' },
        ];
        loadMenuItems(ceoItems);
        if (pathname === '/chiefs-panel') {
            await loadChiefs();
        }

        if (pathname === '/certifications-panel') {
            await loadCertifications();
        }

        if (pathname === '/market-panel') {
            await loadMarket();
        }

        if (pathname === '/isp-info-panel') {
            await loadISPinfo();
        }

        if (pathname === '/isp-requests-panel') {
            await loadISPrequests();
        }

        if (pathname === '/raw-materials-panel') {
            await loadRawMaterials();
        }

        if (pathname === '/providers-panel') {
            await loadProviders();
        }

        if (pathname === '/estate-panel') {
            await loadEstate();
        }

        if (pathname === '/customers-panel') {
            await loadCustomers();
        }

        if (pathname === '/employees-panel') {
            await loadEmployees();
        }
    }

    if (role === 'Recursos Humanos') {
        const hrItems = [
            { text: 'Directores', href: '/chiefs-panel' },
            { text: 'Empleados', href: '/employees-panel' },
        ];
        loadMenuItems(hrItems);
        if (pathname === '/chiefs-panel') {
            await loadChiefs();
        }
        if (pathname === '/employees-panel') {
            await loadEmployees();
        }
    }
};

// Cargar elementos del menú según el rol
loadRoleMenu();

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

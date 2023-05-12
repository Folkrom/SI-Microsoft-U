const loadRoles = async () => {
    const rolesListElement = document.querySelector('#roles-table tbody');
    const { roles } = await getRoles();

    rolesListElement.innerHTML = '';
    roles.forEach((role) => {
        const row = document.createElement('tr');
        const roleCell = document.createElement('td');

        roleCell.textContent = role;

        row.appendChild(roleCell);

        rolesListElement.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const role = document.getElementById('role').value;

    const validRegister = await registerRole(role);

    if (validRegister.err) {
        registerResult.innerHTML = 'No se pudo agregar el rol.';
        return;
    }

    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadRoles();
};

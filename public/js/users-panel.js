const loadUsers = async () => {
    const userListElement = document.querySelector('#users-table tbody');
    const roleSelect = document.getElementById('role');
    const { roles } = await getRoles();
    const { users } = await getUsers();

    roles.forEach((role) => {
        const option = document.createElement('option');
        option.value = role;
        option.text = role;
        roleSelect.appendChild(option);
    });

    userListElement.innerHTML = '';
    users.forEach((user) => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const usernameCell = document.createElement('td');
        const roleCell = document.createElement('td');

        idCell.textContent = user.id;
        usernameCell.textContent = user.username;
        roleCell.textContent = user.role_name;

        row.appendChild(idCell);
        row.appendChild(usernameCell);
        row.appendChild(roleCell);

        userListElement.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (password.length < 6) {
        registerResult.innerHTML =
            'La contraseña debe ser de minimo 6 carácteres.';
        return;
    }

    if (!regex.test(password)) {
        registerResult.innerHTML =
            'La contraseña debe contener al menos una mayuscula y un numero.';
        return;
    }

    const validRegister = await registerUser(username, password, role);

    if (
        validRegister.msg ===
        'El usuario ya existe, usa otro nombre de usuario.'
    ) {
        registerResult.innerHTML =
            'El usuario ya existe, usa otro nombre de usuario.';
        return;
    }

    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadUsers();
};

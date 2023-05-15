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
        const actionsCell = document.createElement('td');

        idCell.textContent = user.id;
        usernameCell.textContent = user.username;
        roleCell.textContent = user.role_name;

        const editButton = createButton(
            'Editar',
            'edit',
            async () => {
                openEditModal(user);
            },
            'action-button-edit'
        );

        const deleteButton = createButton(
            'Eliminar',
            'delete',
            async () => {
                const isDeleted = await deleteUser(user.id);

                if (isDeleted.err) return alert(isDeleted.err);

                loadUsers();
            },
            'action-button-delete'
        );

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(usernameCell);
        row.appendChild(roleCell);
        row.appendChild(actionsCell);

        userListElement.appendChild(row);
    });
};

const openEditModal = async (user) => {
    const { roles } = await getRoles();
    const modal = document.querySelector('#edit-modal');
    const form = document.querySelector('#edit-form');
    const passwordInput = document.querySelector('#edit-password');
    const usernameInput = document.querySelector('#edit-username');
    const roleInput = document.querySelector('#edit-role');
    const closeButton = document.querySelector('#edit-modal > div > span');
    const closeModal = () => (modal.style.display = 'none');
    const nonOption = document.createElement('option');
    closeButton.addEventListener('click', closeModal);
    nonOption.value = '';

    passwordInput.value = '';
    usernameInput.value = '';
    roleInput.innerHTML = '';
    roleInput.appendChild(nonOption);
    roles.forEach((role) => {
        const option = document.createElement('option');
        option.value = role;
        option.text = role;
        roleInput.appendChild(option);
    });

    modal.style.display = 'block';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleEdit(
            user.id,
            passwordInput.value,
            usernameInput.value,
            roleInput.value
        );
    });
};

const handleEdit = async (id, newPassword, newUsername, newRole) => {
    const modal = document.querySelector('#edit-modal');
    const closeModal = () => (modal.style.display = 'none');
    const editResult = document.getElementById('edit-err');

    const isEdited = await editUser(id, newPassword, newUsername, newRole);

    if (isEdited.err) return (editResult.innerHTML = isEdited.err);

    closeModal();
    loadUsers();
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
            'La contraseña debe ser de mínimo 6 caracteres.';
        return;
    }

    if (!regex.test(password)) {
        registerResult.innerHTML =
            'La contraseña debe contener al menos una mayúscula y un número.';
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

const createButton = (text, iconClass, onClick, buttonClass) => {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.classList.add('action-button', buttonClass);
    button.addEventListener('click', onClick);

    icon.classList.add('fa', `fa-${iconClass}`);
    button.appendChild(icon);

    const buttonText = document.createElement('span');
    buttonText.textContent = text;
    button.appendChild(buttonText);

    return button;
};

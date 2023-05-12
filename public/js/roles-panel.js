const loadRoles = async () => {
    const rolesListElement = document.querySelector('#roles-table tbody');
    const { roles } = await getRoles();

    rolesListElement.innerHTML = '';
    roles.forEach((role) => {
        const row = document.createElement('tr');
        const roleCell = document.createElement('td');
        const actionsCell = document.createElement('td');

        roleCell.textContent = role;

        const editButton = createButton(
            'Editar',
            'edit',
            async () => {
                openEditModal(role);
            },
            'action-button-edit'
        );

        const deleteButton = createButton(
            'Eliminar',
            'delete',
            async () => {
                const isDeleted = await deleteRole(role);

                if (isDeleted.err) return alert(isDeleted.err);

                loadRoles();
            },
            'action-button-delete'
        );

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(roleCell);
        row.appendChild(actionsCell);

        rolesListElement.appendChild(row);
    });
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

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const role = document.getElementById('role').value;

    const validRegister = await registerRole(role);

    if (validRegister.err) {
        registerResult.innerHTML = 'No se pudo agregar el rol.';
        return;
    }

    document.getElementById('role').value = '';
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadRoles();
};

const openEditModal = (role) => {
    const modal = document.querySelector('#edit-modal');
    const form = document.querySelector('#edit-form');
    const roleInput = document.querySelector('#edit-role');
    const closeButton = document.querySelector('#edit-modal > div > span');
    const closeModal = () => (modal.style.display = 'none');

    closeButton.addEventListener('click', closeModal);

    roleInput.value = role;
    roleInput.select();

    modal.style.display = 'block';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleEdit(role, roleInput.value);
    });
};

const handleEdit = async (role, newRole) => {
    const modal = document.querySelector('#edit-modal');
    const closeModal = () => (modal.style.display = 'none');
    const editResult = document.getElementById('edit-err');

    const isEdited = await editRole(role, newRole);

    if (isEdited.err) return (editResult.innerHTML = isEdited.err);

    closeModal();
    loadRoles();
};

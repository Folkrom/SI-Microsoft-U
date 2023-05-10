const loadPanel = async () => {
    const userListElement = document.querySelector('#users-table tbody');
    const roleSelect = document.getElementById('role');
    const { roles } = await getRoles();
    const { users } = await getUsers();

    roles.forEach((role, index) => {
        const option = document.createElement('option');
        option.value = index + 1; // Asigna un valor numérico único para cada opción
        option.text = role;
        roleSelect.appendChild(option);
    });

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

const loadPanel = async () => {
    const userListElement = document.querySelector('#users-table tbody');
    const { users } = await getUsers();

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

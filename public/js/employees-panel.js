const loadEmployees = async () => {
    const employeesTable = document.getElementById('employees-table');
    const employeesTbody = employeesTable.querySelector('tbody');

    const { employees } = await getEmployees();

    employeesTbody.innerHTML = '';
    employees.forEach((employee) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in employee) {
            if (employee.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = employee[key];
                row.appendChild(cell);
            }
        }

        employeesTbody.appendChild(row);
    });
};

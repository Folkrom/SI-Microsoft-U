
const loadEmployees = async () => {
    const employeesTable = document.getElementById('employees-table');
    const employeesTbody = employeesTable.querySelector('tbody');

    // Obtiene los empleados de alguna fuente de datos
    const { employees } = await getEmployees();

    // Limpia el contenido previo de la tabla
    employeesTbody.innerHTML = '';

    // Itera sobre los empleados y crea las filas de la tabla
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


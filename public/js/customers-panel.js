const loadCustomers = async () => {
    const customersTable = document.getElementById('customers-table');
    const customersTbody = customersTable.querySelector('tbody');

    const { customers } = await getCustomers();

    customersTbody.innerHTML = '';
    customers.forEach((customer) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in customer) {
            if (customer.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = customer[key];
                row.appendChild(cell);
            }
        }

        customersTbody.appendChild(row);
    });
};

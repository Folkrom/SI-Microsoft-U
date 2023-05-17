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

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const nombre_cliente = document.getElementById('nombre_cliente').value;
    const edad = document.getElementById('edad').value;
    const genero = document.getElementById('genero').value;
    const empresa = document.getElementById('empresa').value;
    const telefono = document.getElementById('telefono').value;
    const curp = document.getElementById('curp').value;
    const rfc = document.getElementById('rfc').value;
    const sede = document.getElementById('sede').value;
    const correo = document.getElementById('correo').value;
    const domicilio = document.getElementById('domicilio').value;
    const alcaldia = document.getElementById('alcaldia').value;

    const formData = {
        nombre_cliente,
        edad,
        genero,
        empresa,
        telefono,
        curp,
        rfc,
        sede,
        correo,
        domicilio,
        alcaldia,
    };

    const validRegister = await registerData('customers', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadCustomers();
};

const loadHardware = async () => {
    const HardwareInfoTable = document.getElementById('hardware-table');
    const HardwareInfoTbody = HardwareInfoTable.querySelector('tbody');

    const { hardware } = await getHardware();

    HardwareInfoTbody.innerHTML = '';
    hardware.forEach((hardware) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in hardware) {
            if (hardware.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = hardware[key];
                row.appendChild(cell);
            }
        }

        HardwareInfoTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const nombreDispositivo =
        document.getElementById('nombreDispositivo').value;
    const fabricante = document.getElementById('fabricante').value;
    const fechaCompra = document.getElementById('fechaCompra').value;
    const especificacionesTecnicas = document.getElementById(
        'especificacionesTecnicas'
    ).value;
    const precio = document.getElementById('precio').value;
    const cantidadStock = document.getElementById('cantidadStock').value;

    const formData = {
        nombreDispositivo,
        fabricante,
        fechaCompra,
        especificacionesTecnicas,
        precio,
        cantidadStock,
    };

    const validRegister = await registerHardware('hardware', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    document.getElementById('especificacionesTecnicas').value = '';

    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadHardware();
};

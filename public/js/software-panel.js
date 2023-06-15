const loadSoftware = async () => {
    const SoftwareInfoTable = document.getElementById('software-table');
    const SoftwareInfoTbody = SoftwareInfoTable.querySelector('tbody');

    const { software } = await getInfoFromEndpoint('software');

    SoftwareInfoTbody.innerHTML = '';
    software.forEach((software) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del software y crea las celdas
        for (const key in software) {
            if (software.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = software[key];
                row.appendChild(cell);
            }
        }

        SoftwareInfoTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const nombreSoftware = document.getElementById('nombreSoftware').value;
    const version = document.getElementById('version').value;
    const desarrollador = document.getElementById('desarrollador').value;
    const fechaCompra = document.getElementById('fechaCompra').value;
    const licencia = document.getElementById('licencia').value;
    const precio = document.getElementById('precio').value;

    const formData = {
        nombreSoftware,
        version,
        desarrollador,
        fechaCompra,
        licencia,
        precio,
    };

    const validRegister = await registerInfo('software', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadSoftware();
};

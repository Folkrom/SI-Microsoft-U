const loadRawMaterials = async () => {
    const rawMaterialsTable = document.getElementById('raw-materials-table');
    const rawMaterialsTbody = rawMaterialsTable.querySelector('tbody');

    const { rawMaterials } = await getInfoFromEndpoint('raw-materials');

    rawMaterialsTbody.innerHTML = '';
    rawMaterials.forEach((rawMaterial) => {
        const row = document.createElement('tr');

        for (const key in rawMaterial) {
            if (rawMaterial.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = rawMaterial[key];
                row.appendChild(cell);
            }
        }

        rawMaterialsTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();

    const registerResult = document.getElementById('register-err');

    const materiaPrima = document.getElementById('materiaPrima').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const marca = document.getElementById('marca').value;
    const loteProduccion = document.getElementById('loteProduccion').value;
    const proveedor = document.getElementById('proveedor').value;
    const presentacion = document.getElementById('presentacion').value;
    const fechaVencimiento = document.getElementById('fechaVencimiento').value;
    const tipoEmpaque = document.getElementById('tipoEmpaque').value;
    const estado = document.getElementById('estado').value;
    const cantidad = document.getElementById('cantidad').value;
    const unidad = document.getElementById('unidad').value;
    const observaciones = document.getElementById('observaciones').value;

    const formData = {
        materia_prima: materiaPrima,
        fecha_ingreso: fechaIngreso,
        marca,
        lote_produccion: loteProduccion,
        proveedor,
        presentacion,
        fecha_vencimiento: fechaVencimiento,
        tipo_empaque: tipoEmpaque,
        estado,
        cantidad,
        unidad,
        observaciones,
    };

    const validRegister = await registerData('/raw-materials', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    document.getElementById('observaciones').value = '';

    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadRawMaterials();
};

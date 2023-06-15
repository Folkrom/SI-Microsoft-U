const loadEstate = async () => {
    const estateTable = document.getElementById('estate-table');
    const estateTbody = estateTable.querySelector('tbody');

    const { estate } = await getInfoFromEndpoint('estate');

    estateTbody.innerHTML = '';
    estate.forEach((property) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in property) {
            if (property.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = property[key];
                row.appendChild(cell);
            }
        }

        estateTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const fecha = document.getElementById('fecha').value;
    const arrendador = document.getElementById('arrendador').value;
    const arrendatario = document.getElementById('arrendatario').value;
    const direccion = document.getElementById('direccion').value;
    const tipoInmueble = document.getElementById('tipo-inmueble').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = document.getElementById('cantidad').value;
    const tipoMaterial = document.getElementById('tipo-material').value;
    const estadoInmueble = document.getElementById('estado-inmueble').value;
    const observaciones = document.getElementById('observaciones').value;

    const formData = {
        fecha,
        arrendador,
        arrendatario,
        direccion,
        tipo_inmueble: tipoInmueble,
        descripcion,
        cantidad,
        tipo_material: tipoMaterial,
        estado_inmueble: estadoInmueble,
        observaciones,
    };

    console.log(formData);
    const validRegister = await registerData('estate', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input, textarea').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadEstate();
};

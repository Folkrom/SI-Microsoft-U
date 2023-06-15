const loadISPrequests = async () => {
    const ISPrequestsTable = document.getElementById('isp-requests-table');
    const ISPrequestsTbody = ISPrequestsTable.querySelector('tbody');

    const { ISPrequests } = await getInfoFromEndpoint('ISPrequests');

    ISPrequestsTbody.innerHTML = '';
    ISPrequests.forEach((request) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in request) {
            if (request.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                const value = request[key];

                // Verifica si el valor es nulo y muestra 'No disponible' en su lugar
                cell.textContent = value !== null ? value : 'No disponible';
                row.appendChild(cell);
            }
        }

        ISPrequestsTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const autorizacion = document.getElementById('autorizacion').value;
    const ampliacionAutorizacion = document.getElementById(
        'ampliacionAutorizacion'
    ).value;
    const entidadPrivada = document.getElementById('entidadPrivada').value;
    const autorizacionPreviaISP = document.getElementById(
        'autorizacionPreviaISP'
    ).value;
    const criterioReferencia =
        document.getElementById('criterioReferencia').value;
    const vigencia = document.getElementById('vigencia').value;
    const alcance = document.getElementById('alcance').value;

    const formData = {
        Autorizacion: autorizacion,
        Ampliacion_de_Autorizacion: ampliacionAutorizacion,
        Entidad_Privada: entidadPrivada,
        Autorizacion_Previa_del_ISP: autorizacionPreviaISP,
        Criterio_de_Referencia: criterioReferencia,
        Vigencia: vigencia,
        Alcance: alcance,
    };

    const validRegister = await registerData('ISPRequests', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadISPrequests();
};

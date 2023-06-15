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

const loadISPinfo = async () => {
    const ISPinfoTable = document.getElementById('isp-info-table');
    const ISPinfoTbody = ISPinfoTable.querySelector('tbody');

    const { ISPinfo } = await getISPinfo();

    ISPinfoTbody.innerHTML = '';
    ISPinfo.forEach((provider) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in provider) {
            if (provider.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = provider[key];
                row.appendChild(cell);
            }
        }

        ISPinfoTbody.appendChild(row);
    });
};

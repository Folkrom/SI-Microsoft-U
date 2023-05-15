const loadProviders = async () => {
    const providersTable = document.getElementById('providers-table');
    const providersTbody = providersTable.querySelector('tbody');

    const { providers } = await getProviders();

    providersTbody.innerHTML = '';
    providers.forEach((provider) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in provider) {
            if (provider.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = provider[key];
                row.appendChild(cell);
            }
        }

        providersTbody.appendChild(row);
    });
};

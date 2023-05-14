const loadMarket = async () => {
    const marketTable = document.getElementById('market-table');
    const marketTbody = marketTable.querySelector('tbody');

    const { market } = await getMarket();

    marketTbody.innerHTML = '';
    market.forEach((employee) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in employee) {
            if (employee.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                const value = employee[key];

                // Verifica si el valor es nulo y muestra 'No disponible' en su lugar
                cell.textContent = value !== null ? value : 'No disponible';

                row.appendChild(cell);
            }
        }

        marketTbody.appendChild(row);
    });
};

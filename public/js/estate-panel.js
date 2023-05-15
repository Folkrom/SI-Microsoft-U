const loadEstate = async () => {
    const estateTable = document.getElementById('estate-table');
    const estateTbody = estateTable.querySelector('tbody');

    const { estate } = await getEstate();

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

const loadChiefs = async () => {
    const chiefsTable = document.getElementById('chiefs-table');
    const chiefsTbody = chiefsTable.querySelector('tbody');

    const { chiefs } = await getChiefs();

    chiefsTbody.innerHTML = '';
    chiefs.forEach((chief) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in chief) {
            if (chief.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = chief[key];
                row.appendChild(cell);
            }
        }

        chiefsTbody.appendChild(row);
    });
};

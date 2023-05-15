const loadRawMaterials = async () => {
    const rawMaterialsTable = document.getElementById('raw-materials-table');
    const rawMaterialsTbody = rawMaterialsTable.querySelector('tbody');

    const { rawMaterials } = await getRawMaterials();

    rawMaterialsTbody.innerHTML = '';
    rawMaterials.forEach((rawMaterial) => {
        const row = document.createElement('tr');

        for (const key in rawMaterial) {
            if (rawMaterial.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                if (key === 'bueno' || key === 'malo' || key === 'regular') {
                    continue; // Omite las propiedades 'bueno', 'malo' y 'regular'
                } else {
                    cell.textContent = rawMaterial[key];
                }
                row.appendChild(cell);
            }
        }

        const calidadCell = document.createElement('td');
        const calidadValue =
            rawMaterial.bueno || rawMaterial.malo || rawMaterial.regular || '';
        calidadCell.textContent = calidadValue;
        row.insertBefore(calidadCell, row.childNodes[9]); // Inserta la celda antes de la última celda en la fila

        rawMaterialsTbody.appendChild(row);
    });
};

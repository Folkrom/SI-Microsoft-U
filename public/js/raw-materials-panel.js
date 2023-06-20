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

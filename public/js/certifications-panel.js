const loadCertifications = async () => {
    const certificationsTable = document.getElementById('certifications-table');
    const certificationsTbody = certificationsTable.querySelector('tbody');

    const { certifications } = await getCertifications();

    certificationsTbody.innerHTML = '';
    certifications.forEach((certification) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in certification) {
            if (certification.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = certification[key];
                row.appendChild(cell);
            }
        }

        certificationsTbody.appendChild(row);
    });
};

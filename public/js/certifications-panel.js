const loadCertifications = async () => {
    const certificationsTable = document.getElementById('certifications-table');
    const certificationsTbody = certificationsTable.querySelector('tbody');

    const { certifications } = await getCertifications();

    certificationsTbody.innerHTML = '';
    certifications.forEach((employee) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in employee) {
            if (employee.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = employee[key];
                row.appendChild(cell);
            }
        }

        certificationsTbody.appendChild(row);
    });
};

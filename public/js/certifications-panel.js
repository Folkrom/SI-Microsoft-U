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

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const normaAplicacion = document.getElementById('norma-aplicacion').value;
    const certificado = document.getElementById('certificado').value;
    const alcance = document.getElementById('alcance').value;
    const año = document.getElementById('año').value;
    const validez = document.getElementById('validez').value;

    const formData = {
        Norma_de_Aplicacion: normaAplicacion,
        Certificado: certificado,
        Alcance: alcance,
        Año: año,
        Validez: validez,
    };

    const validRegister = await registerData('certifications', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input, textarea').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadCertifications();
};

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

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const id_empleado = document.getElementById('id_empleado').value;
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const genero = document.getElementById('genero').value;
    const puesto = document.getElementById('puesto').value;
    const area = document.getElementById('area').value;
    const curp = document.getElementById('curp').value;
    const rfc = document.getElementById('rfc').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const pais = document.getElementById('pais').value;
    const cede = document.getElementById('cede').value;
    const escolaridad = document.getElementById('escolaridad').value;
    const diplomados = document.getElementById('diplomados').value;
    const certificaciones = document.getElementById('certificaciones').value;
    const idiomas = document.getElementById('idiomas').value;
    const formData = {
        ID_Empleado: id_empleado,
        Nombre: nombre,
        Edad: edad,
        Genero: genero,
        Puesto: puesto,
        Area: area,
        CURP: curp,
        RFC: rfc,
        Telefono: telefono,
        Correo: correo,
        Pais_de_Origen: pais,
        Cede: cede,
        Escolaridad: escolaridad,
        Diplomados: diplomados,
        Certificaciones: certificaciones,
        Idiomas: idiomas,
    };

    const validRegister = await registerData('chiefs', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadChiefs();
};

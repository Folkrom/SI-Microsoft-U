const loadEmployees = async () => {
    const employeesTable = document.getElementById('employees-table');
    const employeesTbody = employeesTable.querySelector('tbody');

    const { employees } = await getInfoFromEndpoint('employees');

    employeesTbody.innerHTML = '';
    employees.forEach((employee) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in employee) {
            if (employee.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = employee[key];
                row.appendChild(cell);
            }
        }

        employeesTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const nombre_solicitante =
        document.getElementById('nombre_solicitante').value;
    const id_empleado = parseInt(document.getElementById('id_empleado').value);
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.getElementById('genero').value;
    const puesto = document.getElementById('puesto').value;
    const area = document.getElementById('area').value;
    const curp = document.getElementById('curp').value;
    const rfc = document.getElementById('rfc').value;
    const salario_neto = parseFloat(
        document.getElementById('salario_neto').value
    );
    const salario_bruto = parseFloat(
        document.getElementById('salario_bruto').value
    );
    const sede = document.getElementById('sede').value;
    const horario = document.getElementById('horario').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const pais_origen = document.getElementById('pais_origen').value;
    const domicilio = document.getElementById('domicilio').value;
    const escolaridad = document.getElementById('escolaridad').value;
    const certificaciones = document.getElementById('certificaciones').value;
    const num_hijos = parseInt(document.getElementById('num_hijos').value);
    const beneficiarios = document.getElementById('beneficiarios').value;
    const enfermedades = document.getElementById('enfermedades').value;

    const formData = {
        nombre_solicitante,
        id_empleado,
        edad,
        genero,
        puesto,
        area,
        curp,
        rfc,
        salario_neto,
        salario_bruto,
        sede,
        horario,
        telefono,
        correo,
        pais_origen,
        domicilio,
        escolaridad,
        certificaciones,
        num_hijos,
        beneficiarios,
        enfermedades,
    };

    const validRegister = await registerData('employees', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadEmployees();
};

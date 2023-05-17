const loadISPinfo = async () => {
    const ISPinfoTable = document.getElementById('isp-info-table');
    const ISPinfoTbody = ISPinfoTable.querySelector('tbody');

    const { ISPinfo } = await getISPinfo();

    ISPinfoTbody.innerHTML = '';
    ISPinfo.forEach((provider) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in provider) {
            if (provider.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = provider[key];
                row.appendChild(cell);
            }
        }

        ISPinfoTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const nombre = document.getElementById('nombre').value;
    const tipo_dispositivo = document.getElementById('tipo-dispositivo').value;
    const tipo_conexion = document.getElementById('tipo-conexion').value;
    const conexion_maxima = document.getElementById('conexion-maxima').value;
    const ruta = document.getElementById('ruta').value;
    const direccion_ip = document.getElementById('direccion-ip').value;
    const alcance = document.getElementById('alcance').value;

    const formData = {
        Nombre: nombre,
        Tipo_de_dispositivo: tipo_dispositivo,
        Tipo_de_conexion: tipo_conexion,
        Conexion_maxima: conexion_maxima,
        Ruta: ruta,
        Direccion_IP: direccion_ip,
        Alcance: alcance,
    };

    const validRegister = await registerData('ISPinfo', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadISPinfo();
};

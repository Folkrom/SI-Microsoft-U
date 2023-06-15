const loadProviders = async () => {
    const providersTable = document.getElementById('providers-table');
    const providersTbody = providersTable.querySelector('tbody');

    const { providers } = await getInfoFromEndpoint('providers');

    providersTbody.innerHTML = '';
    providers.forEach((provider) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in provider) {
            if (provider.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = provider[key];
                row.appendChild(cell);
            }
        }

        providersTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const nombre_proveedor = document.getElementById('nombre_proveedor').value;
    const rfc = document.getElementById('rfc').value;
    const numero_contacto = document.getElementById('numero_contacto').value;
    const producto_servicio =
        document.getElementById('producto_servicio').value;
    const precio_unitario = document.getElementById('precio_unitario').value;
    const fecha_entrega = document.getElementById('fecha_entrega').value;
    const forma_pago = document.getElementById('forma_pago').value;
    const garantia_servicio_producto = document.getElementById(
        'garantia_servicio_producto'
    ).value;
    const fecha_inicio_relacion = document.getElementById(
        'fecha_inicio_relacion'
    ).value;
    const contacto_principal =
        document.getElementById('contacto_principal').value;
    const domicilio_proveedor = document.getElementById(
        'domicilio_proveedor'
    ).value;

    const formData = {
        nombre_proveedor,
        rfc,
        numero_contacto,
        producto_servicio,
        precio_unitario,
        fecha_entrega,
        forma_pago,
        garantia_servicio_producto,
        fecha_inicio_relacion,
        contacto_principal,
        domicilio_proveedor,
    };

    const validRegister = await registerData('providers', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadProviders();
};

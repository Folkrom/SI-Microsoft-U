const loadMarket = async () => {
    const marketTable = document.getElementById('market-table');
    const marketTbody = marketTable.querySelector('tbody');

    const { market } = await getInfoFromEndpoint('market');

    marketTbody.innerHTML = '';
    market.forEach((competitor) => {
        const row = document.createElement('tr');

        // Itera sobre las propiedades del empleado y crea las celdas
        for (const key in competitor) {
            if (competitor.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                const value = competitor[key];

                // Verifica si el valor es nulo y muestra 'No disponible' en su lugar
                cell.textContent = value !== null ? value : 'No disponible';

                row.appendChild(cell);
            }
        }

        marketTbody.appendChild(row);
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const registerResult = document.getElementById('register-err');

    const Nombre_de_la_empresa =
        document.getElementById('nombre_empresa').value;
    const Direccion = document.getElementById('direccion').value;
    const Telefono = document.getElementById('telefono').value;
    const Direccion_de_internet =
        document.getElementById('direccion_internet').value;
    const Giro = document.getElementById('giro').value;
    const RFC = document.getElementById('rfc').value;
    const Tamano = document.getElementById('tamano').value;
    const Dueno_de_la_empresa = document.getElementById('dueno_empresa').value;
    const Telefono_del_dueno = document.getElementById('telefono_dueno').value;
    const Email_del_dueno = document.getElementById('email_dueno').value;

    const formData = {
        Nombre_de_la_empresa,
        Direccion,
        Telefono,
        Direccion_de_internet,
        Giro,
        RFC,
        Tamano,
        Dueno_de_la_empresa,
        Telefono_del_dueno,
        Email_del_dueno,
    };

    const validRegister = await registerData('market', formData);

    if (validRegister.err) {
        registerResult.innerHTML = validRegister.err;
        return;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    registerResult.innerHTML = validRegister.msg;
    registerResult.style = 'color: #00FF00;';

    loadMarket();
};

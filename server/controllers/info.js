import dbConfig from '../database/config.js';
import DatabaseConnection from '../models/database-connection.js';
import FormatoOrganizacionalRepository from '../models/formato-organizacional-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const formatoOrganizacionalRepository = new FormatoOrganizacionalRepository(
    dbConnection
);

const getEmpleados = async (req, res) => {
    try {
        const empleados =
            await formatoOrganizacionalRepository.getAllEmpleados();

        res.json({ empleados });
    } catch (error) {
        console.error(`Error retrieving users: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export { getEmpleados };

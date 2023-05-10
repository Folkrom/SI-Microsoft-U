import DatabaseConnection from '../models/database-connection.js';
import dbConfig from '../database/config.js';
import RoleRepository from '../models/role-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const roleRepository = new RoleRepository(dbConnection);

/**
 * This function retrieves all roles and sends them as a JSON response, handling errors with a 500
 * status code.
 */
const getRoles = async (req, res) => {
    try {
        const roles = await roleRepository.getAllRoles();

        res.json({ roles });
    } catch (error) {
        console.error(`Error retrieving users: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export { getRoles };

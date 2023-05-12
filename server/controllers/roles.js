import DatabaseConnection from '../models/database-connection.js';
import dbConfig from '../database/config.js';
import RoleRepository from '../models/role-repository.js';
import UserRepository from '../models/user-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const roleRepository = new RoleRepository(dbConnection);
const userRepository = new UserRepository(dbConnection);

/**
 * This function retrieves all roles and sends them as a JSON response, handling errors with a 500
 * status code.
 */
const getRoles = async (req, res) => {
    try {
        const roles = await roleRepository.getAllRoles();

        res.json({ roles });
    } catch (error) {
        console.error(`Error SQL: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const createRole = async (req, res) => {
    const { role } = req.body;

    try {
        const insertRole = await roleRepository.createRole(role);

        if (!insertRole)
            return res.status(409).json({ err: 'No se pudo crear el rol' });

        res.json({ msg: `Rol ${role} creado!` });
    } catch (error) {
        console.error(`Error SQL: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const updateRole = async (req, res) => {
    const {
        params: { role },
        body: { newRole },
    } = req;

    try {
        const roleExists = await roleRepository.getRole(role);
        if (!roleExists)
            return res.status(404).json({ err: 'Rol no encontrado' });

        const userHasRole = await userRepository.checkUsersWithRole(role);

        if (userHasRole) {
            const addNewRole = await roleRepository.createRole(newRole);
            const updateUsersWithNewRole = await userRepository.updateUsersRole(
                role,
                newRole
            );
            const deleteRole = await roleRepository.deleteRole(role);

            if (addNewRole && updateUsersWithNewRole && deleteRole) {
                return res.json({
                    msg: `Rol ${role} actualizado a ${newRole}!`,
                });
            }

            res.status(409).json({ err: 'No se pudo actualizar el rol' });
        }

        const updateRole = await roleRepository.updateRole(role, newRole);

        if (!updateRole)
            return res
                .status(409)
                .json({ err: 'No se pudo actualizar el rol' });

        res.json({ msg: `Rol ${role} actualizado a ${newRole}!` });
    } catch (error) {
        console.error(`Error SQL: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const deleteRole = async (req, res) => {
    const { role } = req.params;

    try {
        const deleteRole = await roleRepository.deleteRole(role);

        if (!deleteRole)
            return res.status(409).json({ err: 'No se pudo eliminar el rol' });

        res.json({ msg: `Rol ${role} eliminado!` });
    } catch (error) {
        console.error(`Error SQL: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export { getRoles, updateRole, deleteRole, createRole };

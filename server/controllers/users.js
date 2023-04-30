import bcrypt from 'bcrypt';

import DatabaseConnection from '../models/database-connection.js';
import dbConfig from '../database/config.js';
import UserRepository from '../models/user-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const userRepository = new UserRepository(dbConnection);
const userDelete = async (req, res) => {
    res.json({ msg: 'delete endpoint' });
};

const userUpdate = async (req, res) => {
    const {
        params: { id },
        body: { username, password, role_name },
    } = req;

    try {
        const updateData = {};

        if (username) updateData.username = username;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        if (role_name) updateData.role_name = role_name;

        const result = await userRepository.updateUser(id, updateData);
        if (!result) {
            return res
                .status(404)
                .json({ msg: `El usuario con el id ${id} no existe.` });
        }

        res.status(200).json({
            msg: `El usuario con el id ${id} se ha actualizado.`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export { userDelete, userUpdate };

import bcrypt from 'bcrypt';

import DatabaseConnection from '../models/database-connection.js';
import dbConfig from '../database/config.js';
import UserRepository from '../models/user-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const userRepository = new UserRepository(dbConnection);

/**
 * This function retrieves all users from a user repository and returns them as a JSON response, or
 * returns a 500 error message if there is an error.
 */
const getUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();

        res.json({ users });
    } catch (error) {
        console.error(`Error retrieving users: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

/**
 * This is an async function that deletes a user by their ID and returns a success message or an error
 * message if the user does not exist or if there is a server error.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `status()` to set the HTTP status code, `json()` to send a
 * JSON response, and `send()` to send a plain text response.
 * @returns The function `userDelete` is returning a JSON response with a status code and a message. If
 * the user with the specified `id` exists and is successfully deleted, the response will have a status
 * code of 200 and a message indicating that the user has been deleted. If the user does not exist, the
 * response will have a status code of 404 and a message indicating that the user does
 */
const userDelete = async (req, res) => {
    const { id } = req.params;

    if (id == req.uid)
        return res.status(409).json({
            msg: 'No puede eliminar su propio usuario.',
        });

    try {
        const result = await userRepository.deleteUser(id);
        if (!result) {
            return res
                .status(404)
                .json({ msg: `El usuario con el id ${id} no existe.` });
        }

        res.status(200).json({
            msg: `El usuario con el id ${id} ha sido eliminado exitosamente.`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

/**
 * This is an async function that updates a user's username, password, and role name in a database and
 * returns a success message or an error message.
 * @param req - req is an object that represents the HTTP request that was sent by the client to the
 * server. It contains information about the request such as the request method, headers, URL, and any
 * data that was sent in the request body.
 * @param res - `res` is the response object that will be sent back to the client with the updated user
 * data or an error message. It contains methods to set the HTTP status code, headers, and body of the
 * response.
 * @returns The function `userUpdate` is returning a JSON response with a success message and status
 * code 200 if the user update was successful, or a JSON response with an error message and status code
 * 404 or 500 if there was an error or the user with the specified id does not exist.
 */
const userUpdate = async (req, res) => {
    const {
        params: { id },
        body: { newUsername, password, roleName },
    } = req;

    try {
        const updateData = {};

        if (newUsername) updateData.username = newUsername;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        if (roleName) updateData.role_name = roleName;

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

export { getUsers, userDelete, userUpdate };

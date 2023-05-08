import bcrypt from 'bcrypt';

import generarJWT from '../helpers/generar-jwt.js';
import DatabaseConnection from '../models/database-connection.js';
import dbConfig from '../database/config.js';
import UserRepository from '../models/user-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const userRepository = new UserRepository(dbConnection);

/**
 * This is a login function that checks if the username and password provided by the user match the
 * ones stored in the database, generates a JWT token, and sets cookies with the token and user role.
 * @returns The function `login` is returning a JSON response with the `username` and `role` of the
 * user if the login is successful. If the login fails due to incorrect username or password, it
 * returns a JSON response with an error message. If there is an error during the login process, it
 * returns a JSON response with an error message indicating to contact the administrator. Additionally,
 * the function sets two
 */
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userRepository.getUserByUsername(username);
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos',
            });
        }

        const { id: userId, password: dbPassword, role_name: role } = user;

        const validPassword = await bcrypt.compare(password, dbPassword);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password',
            });
        }

        const token = await generarJWT(userId);
        
        res.cookie('x-token', token, {
            httpOnly: true
        });
        res.cookie('x-role', role, {
            httpOnly: true
        });

        res.json({
            username,
            role
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

/**
 * This function registers a new user with a username, password, and role, and returns an appropriate
 * response based on whether the registration was successful or not.
 * @returns The function `register` is returning a response object with a status code and a JSON object
 * containing a message (`msg`) property. The specific message returned depends on the logic of the
 * function and the values of the variables `userExists` and `roleExists`. If there is an error, the
 * response will have a status code of 500 and a generic error message.
 */
const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await userRepository.getUserByUsername(username);
        const roleExists = await dbConnection.executeQuery(
            `SELECT * FROM roles WHERE name = '${role}';`
        );

        if (userExists)
            return res.status(409).json({
                msg: 'El usuario ya existe, usa otro nombre de usuario.',
            });
        if (roleExists.length === 0)
            return res
                .status(409)
                .json({ msg: 'Este rol no es valido, verifica de nuevo' });

        const insertUser = await userRepository.createUser({
            username,
            password: hashedPassword,
            role,
        });

        if (!insertUser) return res.status(500).json({ msg: 'Server error' });

        res.status(201).json({
            msg: `Usuario ${username} - ${role} creado!`,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

/* This is a function called `logout` that clears the cookies with the names `x-token` and `x-role`
and returns a JSON response with a message indicating that the cookies have been deleted. */
const logout = async(req, res) => {
    res.clearCookie('x-token');
    res.clearCookie('x-role');
    res.json({ msg: 'Deleted cookies' });
};

export { login, register, logout };

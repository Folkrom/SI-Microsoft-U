import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import generarJWT from '../helpers/generar-jwt.js';
import DatabaseConnection from '../models/database-connection.js';
import dbConfig from '../database/config.js';
import UserRepository from '../models/user-repository.js';
import TokenRepository from '../models/token-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const userRepository = new UserRepository(dbConnection);
const tokenRepository = new TokenRepository(dbConnection);

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userRepository.getUserByName(username);
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
        const { exp, iat } = jwt.verify(token, process.env.PRIVATE_KEY);
        const expiresAt = new Date(exp * 1000)
                                .toISOString()
                                .replace('T', ' ')
                                .replace(/\.\d{3}Z/, '');
        const createdAt = new Date(iat * 1000)
                                .toISOString()
                                .replace('T', ' ')
                                .replace(/\.\d{3}Z/, '');

        // save the user's token in db
        const hasToken = await tokenRepository.getTokenById(userId);
        if (!hasToken) {
            const saveToken = await tokenRepository.createToken({
                userId,
                token,
                expiresAt,
                createdAt,
            });

            if (!saveToken)
                return res.status(500).json({ msg: 'Server error' });
        } else {
            const updateToken = await tokenRepository.updateToken({
                userId,
                token,
                expiresAt,
                updatedAt: createdAt,
            });
            if (!updateToken)
                return res.status(500).json({ msg: 'Server error' });
        }

        res.json({
            username,
            role,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await userRepository.getUserByName(username);
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

export { login, register };

import jwt from 'jsonwebtoken';

import dbConfig from '../database/config.js';
import DatabaseConnection from '../models/database-connection.js';
import UserRepository from '../models/user-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const userRepository = new UserRepository(dbConnection);

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
        
        const user = await userRepository.getUserById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB',
            });
        }

        req.uid = uid;
        req.role = user.role_name;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido',
        });
    }
};

export { validateJWT };

import jwt from 'jsonwebtoken';

import dbConfig from '../database/config.js';
import DatabaseConnection from '../models/database-connection.js';
import UserRepository from '../models/user-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const userRepository = new UserRepository(dbConnection);

const validateJWT = async (req, res, next) => {
    const token = req.cookies['x-token'];

    if (!token) return res.redirect('/');

    try {
        const { uid, exp } = jwt.verify(token, process.env.PRIVATE_KEY, {
            ignoreExpiration: true,
        });

        const user = await userRepository.getUserById(uid);
        if (!user) return res.redirect('/');

        req.uid = uid;
        req.role = user.role_name;

        if (Date.now() >= exp * 1000) {
            // Token has expired
            res.clearCookie('x-token');
            return res.redirect('/login');
        }

        next();
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

export { validateJWT };

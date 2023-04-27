import jwt from 'jsonwebtoken';
import generarJWT from '../helpers/generar-jwt.js';
// import dbConnection from '../database/config.js';

const login = async(req, res) => {
    const { user, password } = req.body;
    const token = await generarJWT(user);
    const verify = jwt.verify(token, process.env.PRIVATE_KEY);
    
    res.json({user, password, token, verify});

}

const register = async(req, res) => {
    const { user, password, role } =  req.body;

    // res.json({
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     host: process.env.DB_HOST,
    //     db: process.env.DB_NAME
    // });
    res.json({password, user});

}

export {
    login,
    register
}

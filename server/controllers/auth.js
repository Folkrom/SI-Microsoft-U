import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import generarJWT from "../helpers/generar-jwt.js";
import DatabaseConnection from "../models/database-connection.js";
import dbConfig from "../database/config.js";
import UserRepository from "../models/user-repository.js";

const dbConnection = new DatabaseConnection(dbConfig);
const userRepository = new UserRepository(dbConnection);

const login = async (req, res) => {
    const { user, password } = req.body;

    // TODO: Create login function 

    const token = await generarJWT(user);
    const verify = jwt.verify(token, process.env.PRIVATE_KEY);

    res.json({ user, password, token, verify });
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
            return res.status(409).json({ msg: "El usuario ya existe, usa otro nombre de usuario."});
        if (roleExists.length === 0)
            return res.status(409).json({ msg: "Este rol no es valido, verifica de nuevo" });

        const insertUser = await userRepository.createUser({
            username,
            password: hashedPassword,
            role,
        });

        if (!insertUser) return res.status(500).json({ msg: "Server error" });

        res.status(201).json({
            msg: `Usuario ${username} - ${role} creado!`,
        });
    } catch (error) {
        console.log("🚀 ~ file: auth.js:27 ~ register ~ error:", error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};

export { login, register };

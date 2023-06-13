import dbConfig from '../database/config.js';
import DatabaseConnection from '../models/database-connection.js';
import HardwareRepository from '../models/hardware-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const hardwareRepository = new HardwareRepository(dbConnection);
const getAllHardware = async (req, res) => {
    try {
        const hardware = await hardwareRepository.getAllHardware();

        return res.json({ hardware });
    } catch (error) {
        console.error(`Error retrieving all hardware: ${error}`);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const createHardware = async (req, res) => {
    try {
        const hardwareData = req.body;
        const { nombreDispositivo, fabricante, fechaCompra } = hardwareData;

        const hardwareExists = await hardwareRepository.getHardware({
            nombreDispositivo,
            fabricante,
            fechaCompra,
        });

        if (hardwareExists) {
            return res.status(409).json({
                err: 'El equipo ya existe.',
            });
        }

        const hardware = await hardwareRepository.createHardware(hardwareData);
        if (!hardware)
            return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Se ha registrado el equipo: ${nombreDispositivo}`,
        });
    } catch (error) {
        console.error(`Error creating new hardware: ${error}`);
        res.status(500).json({
            error: 'Hable con el administrador',
        });
    }
};

export { getAllHardware, createHardware };

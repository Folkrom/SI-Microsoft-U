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

export { getAllHardware };

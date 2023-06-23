import dbConfig from '../database/config.js';
import DatabaseConnection from '../models/database-connection.js';
import SoftwareRepository from '../models/software-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const softwareRepository = new SoftwareRepository(dbConnection);

const getAllSoftware = async (req, res) => {
    try {
        const software = await softwareRepository.getAllSoftware();
        return res.json({ software });
    } catch (error) {
        console.error(`Error retrieving all software: ${error}`);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const createSoftware = async (req, res) => {
    const softwareData = req.body;
    const { nombreSoftware, version, fechaCompra } = softwareData;

    try {
        const softwareExists = await softwareRepository.getSoftware(
            nombreSoftware,
            version,
            fechaCompra
        );

        if (softwareExists)
            return res.status(409).json({ err: 'Este software ya existe' });

        const software = await softwareRepository.createSoftware(softwareData);

        if (!software)
            return res.status(500).json({ err: 'Error del servidor' });

        res.json({
            msg: `Se ha agregado ${nombreSoftware} en su version ${version}`,
        });
    } catch (error) {
        console.error(`Error creating new softwre: ${error}`);
        res.status(500).json({
            error: 'Hable con el administrador',
        });
    }
};

const deleteSoftware = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await softwareRepository.deleteSoftware(id);
        if (!result) {
            return res
                .status(404)
                .json({ err: `El software con el id ${id} no existe.` });
        }

        res.status(200).json({
            err: `El software con el id ${id} ha sido eliminado exitosamente.`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export { getAllSoftware, createSoftware, deleteSoftware };

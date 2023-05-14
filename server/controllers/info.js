import dbConfig from '../database/config.js';
import CertificacionesRepository from '../models/certifications-repository.js';
import DatabaseConnection from '../models/database-connection.js';
import FormatoOrganizacionalRepository from '../models/formato-organizacional-repository.js';
import MercadoRepository from '../models/market-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const formatoOrganizacionalRepository = new FormatoOrganizacionalRepository(
    dbConnection
);
const certificacionesRepository = new CertificacionesRepository(dbConnection);
const mercadoRepository = new MercadoRepository(dbConnection);

const getEmpleados = async (req, res) => {
    try {
        const empleados =
            await formatoOrganizacionalRepository.getAllEmpleados();

        res.json({ empleados });
    } catch (error) {
        console.error(`Error retrieving users: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getCertifications = async (req, res) => {
    try {
        const certifications =
            await certificacionesRepository.getAllCertificaciones();

        res.json({ certifications });
    } catch (error) {
        console.error(`Error retrieving certifications: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getMarket = async (req, res) => {
    try {
        const market = await mercadoRepository.getAll();

        res.json({ market });
    } catch (error) {
        console.error(`Error retrieving markets: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export { getEmpleados, getCertifications, getMarket };

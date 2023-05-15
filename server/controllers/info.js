import dbConfig from '../database/config.js';
import CustomersRepository from '../models/Customers-repository.js';
import EmployeesRepository from '../models/Employees-repository.js';
import ISPInfoRepository from '../models/ISPInfo-repository.js';
import ISPRequestRepository from '../models/ISPRequest-repository.js';
import EstateRepository from '../models/Inmuebles-repository.js';
import ProvidersRepository from '../models/Providers-repository.js';
import RawMaterialsRepository from '../models/RawMaterials-repository.js';
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
const ISPInfoRepo = new ISPInfoRepository(dbConnection);
const ISPRequestRepo = new ISPRequestRepository(dbConnection);
const rawMaterialsRepository = new RawMaterialsRepository(dbConnection);
const providersRepository = new ProvidersRepository(dbConnection);
const estateRepository = new EstateRepository(dbConnection);
const customersRepository = new CustomersRepository(dbConnection);
const employeesRepository = new EmployeesRepository(dbConnection);

const getChiefs = async (req, res) => {
    try {
        const chiefs = await formatoOrganizacionalRepository.getAll();

        res.json({ chiefs });
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

const getISPInfo = async (req, res) => {
    try {
        const ISPinfo = await ISPInfoRepo.getAll();

        res.json({ ISPinfo });
    } catch (error) {
        console.error(`Error retrieving ISP info: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getISPRequests = async (req, res) => {
    try {
        const ISPrequests = await ISPRequestRepo.getAll();

        res.json({ ISPrequests });
    } catch (error) {
        console.error(`Error retrieving ISP requests: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getRawMaterials = async (req, res) => {
    try {
        const rawMaterials = await rawMaterialsRepository.getAll();

        res.json({ rawMaterials });
    } catch (error) {
        console.error(`Error retrieving materials: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getProviders = async (req, res) => {
    try {
        const providers = await providersRepository.getAll();

        res.json({ providers });
    } catch (error) {
        console.error(`Error retrieving providers: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getEstate = async (req, res) => {
    try {
        const estate = await estateRepository.getAll();

        res.json({ estate });
    } catch (error) {
        console.error(`Error retrieving estate: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await customersRepository.getAll();

        res.json({ customers });
    } catch (error) {
        console.error(`Error retrieving customers: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await employeesRepository.getAll();

        res.json({ employees });
    } catch (error) {
        console.error(`Error retrieving employees: ${error}`);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export {
    getChiefs,
    getCertifications,
    getMarket,
    getISPInfo,
    getISPRequests,
    getRawMaterials,
    getProviders,
    getEstate,
    getCustomers,
    getEmployees,
};

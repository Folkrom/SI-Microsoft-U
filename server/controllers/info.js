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

const addChief = async (req, res) => {
    try {
        const empleadoData = req.body;
        const { Nombre, ID_Empleado, Puesto } = empleadoData;
        const employeeExists =
            await formatoOrganizacionalRepository.getEmpleado(ID_Empleado);

        if (employeeExists) {
            return res.status(409).json({
                err: 'El usuario ya existe, usa otro.',
            });
        }

        const employee = await formatoOrganizacionalRepository.createEmpleado(
            empleadoData
        );

        if (!employee) return res.status(500).json({ err: 'Server error' });

        res.status(201).json({
            msg: `Directivo ${Nombre} con ID ${ID_Empleado} - ${Puesto} creado!`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addEstate = async (req, res) => {
    try {
        const inmuebleData = req.body;
        const { direccion, tipo_inmueble } = inmuebleData;
        const inmuebleExists = await estateRepository.getInmuebleByDireccion(
            direccion
        );

        if (inmuebleExists) {
            return res.status(409).json({
                err: 'El inmueble ya existe.',
            });
        }

        const addEstate = await estateRepository.createInmueble(inmuebleData);

        if (!addEstate)
            return res.status(500).json({ err: 'Error en el servidor' });

        res.status(201).json({
            msg: `Inmueble ubicado en: ${direccion} de tipo ${tipo_inmueble} creado!`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addMarket = async (req, res) => {
    try {
        const mercadoData = req.body;
        const { Nombre_de_la_empresa } = mercadoData;
        const marketExists = await mercadoRepository.getMercado(
            Nombre_de_la_empresa
        );

        if (marketExists) {
            return res.status(409).json({
                err: 'El mercado ya existe.',
            });
        }

        const market = await mercadoRepository.createMercado(mercadoData);

        if (!market) return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Mercado ${Nombre_de_la_empresa} creado exitosamente`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addCustomer = async (req, res) => {
    try {
        const clienteData = req.body;
        const { nombre_cliente } = clienteData;
        const clienteExists = await customersRepository.getClienteByNombre(
            nombre_cliente
        );

        if (clienteExists) {
            return res.status(409).json({
                err: 'El cliente ya existe.',
            });
        }

        const cliente = await customersRepository.createCliente(clienteData);

        if (!cliente)
            return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Cliente ${nombre_cliente} creado exitosamente`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addProvider = async (req, res) => {
    try {
        const providerData = req.body;
        const { nombre_proveedor } = providerData;
        const providerExists = await providersRepository.getProveedorByName(
            nombre_proveedor
        );

        if (providerExists) {
            return res.status(409).json({
                err: 'El proveedor ya existe.',
            });
        }

        const provider = await providersRepository.createProveedor(
            providerData
        );

        if (!provider)
            return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Proveedor ${nombre_proveedor} creado exitosamente`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addISPinfo = async (req, res) => {
    try {
        const ispInfoData = req.body;
        const { Nombre } = ispInfoData;
        const ispExists = await ISPInfoRepo.getIdentificacionISP(Nombre);

        if (ispExists) {
            return res.status(409).json({
                err: 'La identificación del ISP ya existe.',
            });
        }

        const ispInfo = await ISPInfoRepo.createIdentificacionISP(ispInfoData);

        if (!ispInfo)
            return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Identificación del ISP "${Nombre}" creada exitosamente`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addRawMaterial = async (req, res) => {
    try {
        const materiaPrimaData = req.body;
        const { materia_prima, marca } = materiaPrimaData;
        const materiaPrimaExists =
            await rawMaterialsRepository.getMateriaPrimaByNameAndMarca(
                materia_prima,
                marca
            );

        if (materiaPrimaExists) {
            return res.status(409).json({
                err: 'La materia prima con la misma marca ya existe.',
            });
        }

        const createdMateriaPrima =
            await rawMaterialsRepository.createMateriaPrima(materiaPrimaData);

        if (!createdMateriaPrima)
            return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Materia prima creada exitosamente: ${materia_prima} - ${marca}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addEmployee = async (req, res) => {
    try {
        const employeeData = req.body;
        const { id_empleado } = employeeData;
        const employeeExists = await employeesRepository.getEmployee(
            id_empleado
        );

        if (employeeExists) {
            return res.status(409).json({
                err: 'El empleado con el mismo ID ya existe.',
            });
        }

        const createdEmployee = await employeesRepository.createEmployee(
            employeeData
        );

        if (!createdEmployee)
            return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Empleado creado exitosamente: ID ${id_empleado}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addCertification = async (req, res) => {
    // to commit
    try {
        const certificacionData = req.body;
        const { Norma_de_Aplicacion, Certificado } = certificacionData;
        const certificacionExists =
            await certificacionesRepository.getCertificacion(
                Norma_de_Aplicacion,
                Certificado
            );

        if (certificacionExists) {
            return res.status(409).json({
                err: 'La certificación con la misma Norma de Aplicación y Certificado ya existe.',
            });
        }

        const createdCertificacion =
            await certificacionesRepository.createCertificacion(
                certificacionData
            );

        if (!createdCertificacion)
            return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Certificación creada exitosamente: ${Norma_de_Aplicacion} - ${Certificado}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
        });
    }
};

const addISPRequest = async (req, res) => {
    try {
        const ISPRequestData = req.body;
        const { Autorizacion, Entidad_Privada } = ISPRequestData;

        const requestExists = await ISPRequestRepo.getSolicitudISP(
            Entidad_Privada
        );

        if (requestExists) {
            return res.status(409).json({
                err: 'La solicitud del ISP ya existe.',
            });
        }

        const ISPRequest = await ISPRequestRepo.createSolicitudISP(
            ISPRequestData
        );

        if (!ISPRequest)
            return res.status(500).json({ err: 'Error del servidor' });

        res.status(201).json({
            msg: `Solicitud de ISP "${Autorizacion}" - "${Entidad_Privada}" creada exitosamente`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            err: 'Hable con el administrador',
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
    addChief,
    addEstate,
    addMarket,
    addCustomer,
    addProvider,
    addISPinfo,
    addRawMaterial,
    addEmployee,
    addCertification,
    addISPRequest,
};

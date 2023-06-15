import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-JWT.js';
import {
    getCertifications,
    getChiefs,
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
} from '../controllers/info.js';
import { createHardware, getAllHardware } from '../controllers/hardware.js';
import { createSoftware, getAllSoftware } from '../controllers/software.js';


const router = Router();

router.get('/chiefs', [
    validateJWT,
    // isAdminRole -> isValidRole
], getChiefs);

router.get('/certifications', [
    validateJWT,
    // isAdminRole -> isValidRole
], getCertifications);

router.get('/market', [
    validateJWT,
    // isAdminRole -> isValidRole
], getMarket);

router.get('/ISPinfo', [
    validateJWT,
    // isAdminRole -> isValidRole
], getISPInfo);

router.get('/ISPrequests', [
    validateJWT,
    // isAdminRole -> isValidRole
], getISPRequests);

router.get('/raw-materials', [
    validateJWT,
    // isAdminRole -> isValidRole
], getRawMaterials);

router.get('/providers', [
    validateJWT,
    // isAdminRole -> isValidRole
], getProviders);

router.get('/estate', [
    validateJWT,
    // isAdminRole -> isValidRole
], getEstate);

router.get('/customers', [
    validateJWT,
    // isAdminRole -> isValidRole
], getCustomers);

router.get('/employees', [
    validateJWT,
    // isAdminRole -> isValidRole
], getEmployees);

router.post('/chiefs', [
    validateJWT,
    // isAdminRole -> isValidRole
], addChief);

router.post('/estate', [
    validateJWT,
    // isAdminRole -> isValidRole
], addEstate);

router.post('/market', [
    validateJWT,
    // isAdminRole -> isValidRole
], addMarket);

router.post('/customers', [
    validateJWT,
    // isAdminRole -> isValidRole
], addCustomer);

router.post('/providers', [
    validateJWT,
    // isAdminRole -> isValidRole
], addProvider);

router.post('/ISPinfo', [
    validateJWT,
    // isAdminRole -> isValidRole
], addISPinfo);

router.post('/ISPRequests', [
    validateJWT,
    // isAdminRole -> isValidRole
], addISPRequest);

router.post('/raw-materials', [
    validateJWT,
    // isAdminRole -> isValidRole
], addRawMaterial);

router.post('/employees', [
    validateJWT,
    // isAdminRole -> isValidRole
], addEmployee);

router.post('/certifications', [
    validateJWT,
    // isAdminRole -> isValidRole
], addCertification);

router.get('/hardware', [
    validateJWT,
], getAllHardware);

router.post('/hardware', [
    validateJWT,
], createHardware);

router.get('/software', [
    validateJWT,
], getAllSoftware);

router.post('/software', [
    validateJWT,
], createSoftware);



export default router;

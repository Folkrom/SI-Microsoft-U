import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-JWT.js';
import {
    getCertifications,
    getChieffs,
    getMarket,
    getISPInfo,
    getISPRequests,
    getRawMaterials,
    getProviders,
    getEstate,
    getCustomers,
    getEmployees,
} from '../controllers/info.js';


const router = Router();

router.get('/chieffs', [
    validateJWT,
    // isAdminRole -> isValidRole
], getChieffs);

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


export default router;

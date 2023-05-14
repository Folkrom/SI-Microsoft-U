import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-JWT.js';
import { getCertifications, getEmpleados, getMarket, getISPInfo, getISPRequests, getRawMaterials } from '../controllers/info.js';


const router = Router();

router.get('/empleados', [
    validateJWT,
    // isAdminRole -> isValidRole
], getEmpleados);

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


export default router;

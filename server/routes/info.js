import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-JWT.js';
import { getCertifications, getEmpleados, getMarket } from '../controllers/info.js';


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


export default router;

import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-JWT.js';
import { getCertifications, getEmpleados } from '../controllers/info.js';


const router = Router();

router.get('/empleados', [
    validateJWT,
    // isAdminRole -> isValidRole
], getEmpleados);

router.get('/certifications', [
    validateJWT,
    // isAdminRole -> isValidRole
], getCertifications);


export default router;

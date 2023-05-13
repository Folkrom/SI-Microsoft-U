import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-JWT.js';
import { getEmpleados } from '../controllers/info.js';


const router = Router();

router.get('/empleados', [
    validateJWT,
    // isAdminRole -> isValidRole
], getEmpleados);


export default router;

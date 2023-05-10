import { Router } from 'express';

import { validateJWT } from '../middlewares/validate-JWT.js';
import { isAdminRole } from '../middlewares/validate-roles.js';
import { getRoles } from '../controllers/roles.js';

const router = Router();

router.get('/', [
    validateJWT,
    isAdminRole
], getRoles);

export default router;

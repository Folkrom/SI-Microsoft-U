import { Router } from 'express';
import { check } from 'express-validator';

import { validateJWT } from '../middlewares/validate-JWT.js';
import { isAdminRole } from '../middlewares/validate-roles.js';
import { createRole, deleteRole, getRoles, updateRole } from '../controllers/roles.js';
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.get('/', [
    validateJWT,
    isAdminRole
], getRoles);

router.post('/create', [
    validateJWT,
    isAdminRole,
    check('role', 'El rol es obligatorio').notEmpty(),
    validateFields
], createRole);

router.put('/:role', [
    validateJWT,
    isAdminRole,
    check('newRole', 'El nuevo rol es obligatorio').notEmpty(),
    validateFields
], updateRole);

router.delete('/:role', [
    validateJWT,
    isAdminRole
], deleteRole);

export default router;

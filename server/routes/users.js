import { Router } from 'express';
import { check } from 'express-validator';

import { getUsers, userDelete, userUpdate } from '../controllers/users.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { isValidRole, userExistsByName } from '../helpers/db-validators.js';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { isAdminRole } from '../middlewares/validate-roles.js';

const router = Router();

router.get('/', [
    validateJWT,
    isAdminRole,
    validateFields
], getUsers);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id').isNumeric(),
    validateFields
], userDelete);

router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id').isNumeric(),
    check('password', 'La password debe contener al menos una mayuscula y un numero')
            .isLength({ min: 6 })
            .matches(/^(?=.*[A-Z])(?=.*[0-9])/),
    check('roleName').custom((value, {req}) => {
        if (!value) return true;

        return isValidRole(value);
    }).withMessage(),
    check('newUsername').custom((value, {req}) => {
        if (!value) return true;

        return userExistsByName(value);
    }).withMessage(),
    validateFields
], userUpdate);

export default router;

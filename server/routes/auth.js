import { Router } from 'express';
import { login, register } from '../controllers/auth.js';
import { check } from 'express-validator';
import { isValidRole } from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.post('/login', [
    check('username').notEmpty(),
    check('password').notEmpty().isLength({ min: 6 }),
    validateFields
], login);

router.post('/register', [
    // validarJWT,
    check('username').notEmpty(),
    check('password', 'La password debe contener al menos una mayuscula y un numero')
            .isLength({ min: 6 })
            .matches(/^(?=.*[A-Z])(?=.*[0-9])/),
    check('role').notEmpty().custom(isValidRole),
    validateFields
], register);

export default router;

import Router from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { validateJWT } from '../middlewares/validate-JWT.js';
import { isAdminRole } from '../middlewares/validate-roles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

const mainRoute = join(__dirname, '..', '..', 'public');

router.get('/', (req, res) => {
    if (req.cookies['x-token']) 
        return res.redirect('/dashboard');

    const route = join(mainRoute, 'index.html');
    res.sendFile(route);
});

router.get('/dashboard', [
    validateJWT
], (req, res) => {
    const route = join(mainRoute, 'pages', 'dashboard.html');
    res.sendFile(route);
});

router.get('/users-panel', [
    validateJWT,
    isAdminRole
], (req, res) => {
    const route = join(mainRoute, 'pages', 'users-panel.html');
    res.sendFile(route);
});

router.get('/roles-panel', [
    validateJWT,
    isAdminRole
], (req, res) => {
    const route = join(mainRoute, 'pages', 'roles-panel.html');
    res.sendFile(route);
});

router.get('/employees-panel', [
    validateJWT,
    // isValidRole
], (req, res) => {
    const route = join(mainRoute, 'pages', 'employees-panel.html');
    res.sendFile(route);
});

router.get('/certifications-panel', [
    validateJWT,
    // isValidRole
], (req, res) => {
    const route = join(mainRoute, 'pages', 'certifications-panel.html');
    res.sendFile(route);
});

router.get('/market-panel', [
    validateJWT,
    // isValidRole
], (req, res) => {
    const route = join(mainRoute, 'pages', 'market-panel.html');
    res.sendFile(route);
});

router.get('/isp-info-panel', [
    validateJWT,
    // isValidRole
], (req, res) => {
    const route = join(mainRoute, 'pages', 'isp-info-panel.html');
    res.sendFile(route);
});

export default router;

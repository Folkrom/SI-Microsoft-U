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

router.get('/admin-panel', [
    validateJWT,
    isAdminRole
], (req, res) => {
    const route = join(mainRoute, 'pages', 'admin-panel.html');
    res.sendFile(route);
});

export default router;

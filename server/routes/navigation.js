import Router from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { validateJWT } from '../middlewares/validate-JWT.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get('/', (req, res) => {
    if (req.cookies['x-token']) {
        const route = join(__dirname, '..', '..', 'public/pages/dashboard.html');
        res.sendFile(route);
    }
});

router.get('/dashboard', [
    validateJWT
], (req, res) => {
    const route = join(__dirname, '..', '..', 'public/pages/dashboard.html');
    res.sendFile(route);
});


export default router;

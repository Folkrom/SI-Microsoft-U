import { Router } from 'express';
import { userDelete, userUpdate } from '../controllers/users.js';

const router = Router();

router.delete('/:id', [

], userDelete);

router.put('/:id', [

], userUpdate);

export default router;

import dotenv from 'dotenv';
import Server from './models/server.js';

dotenv.config({ path: './server/.env' });
const server = new Server();

server.listen();

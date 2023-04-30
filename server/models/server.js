import express from 'express';
import cors from 'cors';

import authRoute from '../routes/auth.js';
import usersRoute from '../routes/users.js';

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users'
        };

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );
        
    }

    routes() {
        this.app.use(this.paths.auth, authRoute);
        this.app.use(this.paths.users, usersRoute);
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });        
    }

}

export default Server;

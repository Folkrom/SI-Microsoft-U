import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from '../routes/auth.js';
import usersRoute from '../routes/users.js';
import navigationRoute from '../routes/navigation.js';
import rolesRoute from '../routes/roles.js';

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            roles: '/api/roles',
            
        };
        
        // Middlewares
        this.middlewares();
        
        // App Routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        
        // Body reading & parsing
        this.app.use( express.json() );
        
        // Cookie Parser
        this.app.use( cookieParser() );
        
        // Main Route
        this.app.use(navigationRoute);
        
        // Public directory
        this.app.use( express.static('public') );
        
    }

    routes() {
        this.app.use(this.paths.auth, authRoute);
        this.app.use(this.paths.users, usersRoute);
        this.app.use(this.paths.roles, rolesRoute);

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });        
    }

}

export default Server;

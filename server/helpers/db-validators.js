import dbConfig from '../database/config.js';
import DatabaseConnection from '../models/database-connection.js';
import RoleRepository from '../models/role-repository.js';
import UserRepository from '../models/user-repository.js';

const dbConnection = new DatabaseConnection(dbConfig);
const roleRepository = new RoleRepository(dbConnection);
const userRepository = new UserRepository(dbConnection);

/**
 * The function checks if a given role exists in a database and throws an error if it does not.
 * @param [roleName] - A string representing the name of the role to be checked for validity.
 */
const isValidRole = async(roleName = '') => {
    const roleExists = await roleRepository.getRole(roleName); 

    if ( !roleExists ) 
        throw new Error(`El rol ${roleName} no esta registrado en la BD`);
}

/**
 * The function checks if a user already exists in the database by their username and throws an error
 * if they do.
 * @param [username] - The username parameter is a string that represents the username of a user that
 * we want to check if it already exists in the database.
 */
const userExistsByName = async(username = '') => {
    const userExists = await userRepository.getUserByUsername(username);
    
    if ( userExists ) 
        throw new Error(`El usuario ${username} ya esta registrado en la BD`);
}

export {
    isValidRole,
    userExistsByName,
    
}

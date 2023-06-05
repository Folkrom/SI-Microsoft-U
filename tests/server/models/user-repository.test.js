import bcrypt from 'bcrypt';

import DatabaseConnection from '../../../server/models/database-connection';
import dbConfig from '../../../server/database/config';
import UserRepository from '../../../server/models/user-repository';

describe('User-repository test', () => {
    const databaseConnection = new DatabaseConnection(dbConfig);
    const userRepository = new UserRepository(databaseConnection);

    describe('getAllUsers', () => {
        it('should retrive all users', async () => {
            const expectedUsers = [
                {
                    id: 1,
                    username: 'admin',
                    role_name: 'Administrador',
                },
            ];

            const result = await userRepository.getAllUsers();

            expect(result).toEqual(expectedUsers);
        });
    });

    describe('getUser', () => {
        it('should return a single user', async () => {
            const user = {
                username: 'admin',
                password:
                    '$2b$10$zrsP6yrp4V5WyDXaUPHAS.nRQRlnksjMeUMyKSowmXQBmTHGiqB/u',
            };

            const expectedUser = {
                id: 1,
                username: 'admin',
                password:
                    '$2b$10$zrsP6yrp4V5WyDXaUPHAS.nRQRlnksjMeUMyKSowmXQBmTHGiqB/u',
                role_name: 'Administrador',
            };

            const result = await userRepository.getUser(user);
            expect(result).toEqual(expectedUser);
        });
    });

    describe('getUserByUsername', () => {
        it('should return a single user using a username', async () => {
            const username = 'admin';
            const expectedUser = {
                id: 1,
                username: 'admin',
                password:
                    '$2b$10$zrsP6yrp4V5WyDXaUPHAS.nRQRlnksjMeUMyKSowmXQBmTHGiqB/u',
                role_name: 'Administrador',
            };

            const result = await userRepository.getUserByUsername(username);

            expect(result).toEqual(expectedUser);
        });
    });

    describe('getUserById', () => {
        it('should return a single user using an id', async () => {
            const id = 1;
            const expectedUser = {
                id: 1,
                username: 'admin',
                password:
                    '$2b$10$zrsP6yrp4V5WyDXaUPHAS.nRQRlnksjMeUMyKSowmXQBmTHGiqB/u',
                role_name: 'Administrador',
            };

            const result = await userRepository.getUserById(id);

            expect(result).toEqual(expectedUser);
        });
    });

    describe('createUser', () => {
        it('should create a new user using username, password and role', async () => {
            const user = {
                username: 'test',
                password: await bcrypt.hash('Adm1n1str4d0r', 10),
                role: 'TI',
            };

            const result = await userRepository.createUser(user);

            expect(result).toBe(true);

            // Erase test user
            const createdUser = await userRepository.getUserByUsername(
                user.username
            );
            await userRepository.deleteUser(createdUser.id);
        });
    });

    describe('updateUser', () => {
        it('should update an existing user and return true', async () => {
            const user = {
                username: 'test',
                password: await bcrypt.hash('Adm1n1str4d0r', 10),
                role: 'TI',
            };
            await userRepository.createUser(user);
            const { id } = await userRepository.getUserByUsername(
                user.username
            );

            const newPass = 'nuevaPass';
            const update = {
                password: await bcrypt.hash(newPass, 10),
                role_name: 'TI',
                username: 'test updated',
            };

            const result = await userRepository.updateUser(id, update);

            expect(result).toBe(true);

            await userRepository.deleteUser(id);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user using its id and return true', async () => {
            const user = {
                username: 'test',
                password: await bcrypt.hash('Adm1n1str4d0r', 10),
                role: 'TI',
            };
            await userRepository.createUser(user);
            const { id } = await userRepository.getUserByUsername(
                user.username
            );

            const result = await userRepository.deleteUser(id);

            expect(result).toBe(true);
        });
    });
});

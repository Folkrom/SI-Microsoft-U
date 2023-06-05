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

    
});

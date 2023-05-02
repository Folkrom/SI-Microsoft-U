/* The RoleRepository class provides methods for interacting with a database table of roles, including
getting, creating, updating, and deleting roles. */
class RoleRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getRole(roleName) {
        const query = 'SELECT * FROM Roles WHERE name = ?;';
        const params = [roleName];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving role with name "${roleName}": ${err}`
            );
            throw err;
        }
    }

    async getAllRoles() {
        const query = 'SELECT * FROM Roles;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving roles: ${err}`);
            throw err;
        }
    }

    async updateRole({ roleName, newRole }) {
        const roleExists = await this.getRole(roleName);
        if (!roleExists) return false;

        const query = `UPDATE Roles 
                       SET name = ?
                       WHERE name = ?;`;
        const params = [newRole, roleName];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );

            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error updating user: ${err}`);
            throw err;
        }
    }

    async createRole(roleName) {
        const roleExists = await this.getRole(roleName);
        if (roleExists) return true;

        const query = `INSERT INTO Roles (name) 
                       VALUES (?);`;
        const params = [roleName];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating role: ${err}`);
            throw err;
        }
    }

    async deleteRole(roleName) {
        const query = 'DELETE FROM Roles WHERE name = ?;';
        const params = [roleName];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(
                `Error deleting role with name "${roleName}": ${err}`
            );
            throw err;
        }
    }
}

export default RoleRepository;

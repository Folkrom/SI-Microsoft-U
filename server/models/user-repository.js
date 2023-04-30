class UserRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getUser({ username, password }) {
        const query =
            'SELECT * FROM users WHERE username = ? AND password = ?;';
        const params = [username, password];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving user with id ${id}: ${err}`);
            throw err;
        } 
    }

    async getUserByName(username) {
        const query = 'SELECT * FROM users WHERE username = ?;';
        const params = [username];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving user with id ${id}: ${err}`);
            throw err;
        }
    }

    async createUser({ username, password, role }) {
        const query = `INSERT INTO Users (username, password, role_name) 
                       VALUES (?, ?, ?);`;
        const params = [username, password, role];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating user: ${err}`);
            throw err;
        }
    }

    async updateUser(id, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(", ");
        const values = Object.values(update);
        values.push(id);
      
        const query = `UPDATE Users 
                       SET ${setClause} 
                       WHERE id = ?;`;
        
        try {
          const { affectedRows } = await this.dbConnection.executeQuery(query, values);
          
          if (!affectedRows) return false;
          
          return true;
        } catch (err) {
          console.error(`Error updating user: ${err}`);
          throw err;
        }
      }
      

}

export default UserRepository;

class TokenRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async createToken({ userId, token, expiresAt, createdAt }) {
        const query = `INSERT INTO tokens (user_id, token, expires_at, created_at, updated_at)
                       VALUES (?, ?, DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s'), 
                                    DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s'), 
                                    DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s'));`;
        const params = [userId, token, expiresAt, createdAt, createdAt];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating token: ${err}`);
            throw err;
        }
    }

    async updateToken({ userId, token, expiresAt, updatedAt }) {
        const query = `UPDATE tokens 
                       SET  token = ?, 
                            expires_at = DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s'), 
                            updated_at = DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s')
                       WHERE user_id = ?;`;
        const params = [token, expiresAt, updatedAt, userId];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating token: ${err}`);
            throw err;
        }
    }

    async getTokenById(userId) {
        const query = `SELECT token FROM tokens WHERE user_id = ?;`;
        const params = [userId];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving token: ${err}`);
            throw err;
        }
    }
}

export default TokenRepository;

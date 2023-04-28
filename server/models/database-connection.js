import mysql from 'mysql2/promise';

class DatabaseConnection {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
    }

    async executeQuery(query, params = []) {
        const connection = await mysql.createConnection(this.dbConfig);

        try {
            const [rows] = await connection.execute(query, params);
            return rows;
        } catch (err) {
            await connection.rollback();
            throw new Error(`Error executing query: ${err}`);
        } finally {
            await connection.end();
        }
    }
}

export default DatabaseConnection;

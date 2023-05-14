class MercadoRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getMercado(nombreEmpresa) {
        const query = 'SELECT * FROM Mercado WHERE Nombre_de_la_empresa = ?;';
        const params = [nombreEmpresa];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving market with Nombre_de_la_empresa "${nombreEmpresa}": ${err}`
            );
            throw err;
        }
    }

    async getAll() {
        const query = 'SELECT * FROM Mercado;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving markets: ${err}`);
            throw err;
        }
    }

    async updateMercado(nombreEmpresa, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(nombreEmpresa);

        const query = `UPDATE Mercado
                     SET ${setClause}
                     WHERE Nombre_de_la_empresa = ?;`;

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                values
            );

            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error updating market: ${err}`);
            throw err;
        }
    }

    async createMercado(mercadoData) {
        const query = `INSERT INTO Mercado 
                     (Nombre_de_la_empresa, Direccion, Telefono, Direccion_de_internet, Giro, RFC, Tamano, Dueno_de_la_empresa, Telefono_del_dueno, Email_del_dueno)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            mercadoData.Nombre_de_la_empresa,
            mercadoData.Direccion,
            mercadoData.Telefono,
            mercadoData.Direccion_de_internet,
            mercadoData.Giro,
            mercadoData.RFC,
            mercadoData.Tamano,
            mercadoData.Dueno_de_la_empresa,
            mercadoData.Telefono_del_dueno,
            mercadoData.Email_del_dueno,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating market: ${err}`);
            throw err;
        }
    }

    async deleteMercado(nombreEmpresa) {
        const query = 'DELETE FROM Mercado WHERE Nombre_de_la_empresa = ?;';
        const params = [nombreEmpresa];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(
                `Error deleting market with Nombre_de_la_empresa "${nombreEmpresa}": ${err}`
            );
            throw err;
        }
    }
}

export default MercadoRepository;

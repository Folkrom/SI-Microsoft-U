class SoftwareRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getSoftwareById(id) {
        const query = 'SELECT * FROM Software WHERE id = ?;';
        const params = [id];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving software with id "${id}": ${err}`);
            throw err;
        }
    }

    async getSoftware(nombreSoftware, version, fechaCompra) {
        const query = 'SELECT * FROM Software \
                       WHERE nombre_software = ? \
                       AND version = ? AND fecha_compra = ?;';

        const params = [nombreSoftware, version, fechaCompra];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (error) {
            console.error(
                `Error retrieving hardware with info: "${
                    (nombreSoftware, version, fechaCompra)
                }": ${error}`
            );
            throw error;
        }
    }

    async getAllSoftware() {
        const query = 'SELECT * FROM Software;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving software: ${err}`);
            throw err;
        }
    }

    async updateSoftware(id, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(id);

        const query = `UPDATE Software
                     SET ${setClause}
                     WHERE id = ?;`;

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                values
            );

            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error updating software: ${err}`);
            throw err;
        }
    }

    async createSoftware(softwareData) {
        const query = `INSERT INTO Software 
                     (nombre_software, version, desarrollador, fecha_compra, licencia, precio)
                     VALUES (?, ?, ?, ?, ?, ?);`;
        const params = [
            softwareData.nombreSoftware,
            softwareData.version,
            softwareData.desarrollador,
            softwareData.fechaCompra,
            softwareData.licencia,
            softwareData.precio,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating software: ${err}`);
            throw err;
        }
    }

    async deleteSoftware(id) {
        const query = 'DELETE FROM Software WHERE id = ?;';
        const params = [id];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error deleting software with id "${id}": ${err}`);
            throw err;
        }
    }
}

export default SoftwareRepository;

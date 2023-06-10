class HardwareRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getHardwareById(id) {
        const query = 'SELECT * FROM Hardware WHERE id = ?;';
        const params = [id];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving hardware with id "${id}": ${err}`);
            throw err;
        }
    }

    async getHardware({ nombreDispositivo, fabricante, fechaCompra }) {
        const query =
            'SELECT * FROM Hardware \
                       WHERE nombre_dispositivo = ? \
                       AND fabricante = ? AND fecha_compra = ?';
        const params = [nombreDispositivo, fabricante, fechaCompra];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (error) {
            console.error(
                `Error retrieving hardware with info: "${
                    (nombreDispositivo, fabricante, fechaCompra)
                }": ${error}`
            );
            throw error;
        }
    }

    async getAllHardware() {
        const query = 'SELECT * FROM Hardware;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving hardware: ${err}`);
            throw err;
        }
    }

    async updateHardware(id, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(id);

        const query = `UPDATE Hardware
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
            console.error(`Error updating hardware: ${err}`);
            throw err;
        }
    }

    async createHardware(hardwareData) {
        const query = `INSERT INTO Hardware 
                     (nombre_dispositivo, fabricante, fecha_compra, especificaciones_tecnicas, precio, cantidad_stock)
                     VALUES (?, ?, ?, ?, ?, ?);`;
        const params = [
            hardwareData.nombreDispositivo,
            hardwareData.fabricante,
            hardwareData.fechaCompra,
            hardwareData.especificacionesTecnicas,
            hardwareData.precio,
            hardwareData.cantidadStock,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating hardware: ${err}`);
            throw err;
        }
    }

    async deleteHardware(id) {
        const query = 'DELETE FROM Hardware WHERE id = ?;';
        const params = [id];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error deleting hardware with id "${id}": ${err}`);
            throw err;
        }
    }
}

export default HardwareRepository;

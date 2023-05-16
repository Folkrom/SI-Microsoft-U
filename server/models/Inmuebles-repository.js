class EstateRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getInmueble(id) {
        const query = 'SELECT * FROM Inmuebles WHERE id = ?;';
        const params = [id];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving property with id "${id}": ${err}`);
            throw err;
        }
    }

    async getInmuebleByDireccion(direccion) {
        const query = 'SELECT * FROM Inmuebles WHERE direccion = ?;';
        const params = [direccion];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving property with direccion "${direccion}": ${err}`
            );
            throw err;
        }
    }

    async getAll() {
        const query = 'SELECT * FROM Inmuebles;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving properties: ${err}`);
            throw err;
        }
    }

    async updateInmueble(id, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(id);

        const query = `UPDATE Inmuebles
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
            console.error(`Error updating property: ${err}`);
            throw err;
        }
    }

    async createInmueble(inmuebleData) {
        const query = `INSERT INTO Inmuebles 
                     (fecha, arrendador, arrendatario, direccion, tipo_inmueble, descripcion, cantidad, tipo_material, estado_inmueble, observaciones)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            inmuebleData.fecha,
            inmuebleData.arrendador,
            inmuebleData.arrendatario,
            inmuebleData.direccion,
            inmuebleData.tipo_inmueble,
            inmuebleData.descripcion,
            inmuebleData.cantidad,
            inmuebleData.tipo_material,
            inmuebleData.estado_inmueble,
            inmuebleData.observaciones,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating property: ${err}`);
            throw err;
        }
    }

    async deleteInmueble(id) {
        const query = 'DELETE FROM Inmuebles WHERE id = ?;';
        const params = [id];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error deleting property with id "${id}": ${err}`);
            throw err;
        }
    }
}

export default EstateRepository;

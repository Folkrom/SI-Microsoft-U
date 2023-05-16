class RawMaterialsRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getMateriaPrima(id) {
        const query = 'SELECT * FROM Materias_primas WHERE id = ?;';
        const params = [id];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving raw material with id "${id}": ${err}`
            );
            throw err;
        }
    }

    async getMateriaPrimaByNameAndMarca(materiaPrima, marca) {
        const query =
            'SELECT * FROM Materias_primas WHERE materia_prima = ? AND marca = ?;';
        const params = [materiaPrima, marca];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving raw material by name and marca: ${err}`
            );
            throw err;
        }
    }

    async getAll() {
        const query = 'SELECT * FROM Materias_primas;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving raw materials: ${err}`);
            throw err;
        }
    }

    async updateMateriaPrima(id, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(id);

        const query = `UPDATE Materias_primas
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
            console.error(`Error updating raw material: ${err}`);
            throw err;
        }
    }

    async createMateriaPrima(materiaPrimaData) {
        const query = `INSERT INTO Materias_primas 
                     (materia_prima, fecha_ingreso, marca, lote_produccion, proveedor, presentacion, fecha_vencimiento, tipo_empaque, bueno, malo, regular, cantidad, unidad, observaciones)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            materiaPrimaData.materia_prima,
            materiaPrimaData.fecha_ingreso,
            materiaPrimaData.marca,
            materiaPrimaData.lote_produccion,
            materiaPrimaData.proveedor,
            materiaPrimaData.presentacion,
            materiaPrimaData.fecha_vencimiento,
            materiaPrimaData.tipo_empaque,
            materiaPrimaData.bueno,
            materiaPrimaData.malo,
            materiaPrimaData.regular,
            materiaPrimaData.cantidad,
            materiaPrimaData.unidad,
            materiaPrimaData.observaciones,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating raw material: ${err}`);
            throw err;
        }
    }

    async deleteMateriaPrima(id) {
        const query = 'DELETE FROM Materias_primas WHERE id = ?;';
        const params = [id];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(
                `Error deleting raw material with id "${id}": ${err}`
            );
            throw err;
        }
    }
}

export default RawMaterialsRepository;

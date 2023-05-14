class ISPInfoRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getIdentificacionISP(nombre) {
        const query = 'SELECT * FROM Identificacion_ISP WHERE Nombre = ?;';
        const params = [nombre];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving ISP identification with Nombre "${nombre}": ${err}`
            );
            throw err;
        }
    }

    async getAll() {
        const query = 'SELECT * FROM Identificacion_ISP;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving ISP identifications: ${err}`);
            throw err;
        }
    }

    async updateIdentificacionISP(nombre, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(nombre);

        const query = `UPDATE Identificacion_ISP
                     SET ${setClause}
                     WHERE Nombre = ?;`;

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                values
            );

            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error updating ISP identification: ${err}`);
            throw err;
        }
    }

    async createIdentificacionISP(identificacionISPData) {
        const query = `INSERT INTO Identificacion_ISP 
                     (Nombre, Tipo_de_dispositivo, Tipo_de_conexion, Conexion_maxima, Ruta, Direccion_IP, Alcance)
                     VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            identificacionISPData.Nombre,
            identificacionISPData.Tipo_de_dispositivo,
            identificacionISPData.Tipo_de_conexion,
            identificacionISPData.Conexion_maxima,
            identificacionISPData.Ruta,
            identificacionISPData.Direccion_IP,
            identificacionISPData.Alcance,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating ISP identification: ${err}`);
            throw err;
        }
    }

    async deleteIdentificacionISP(nombre) {
        const query = 'DELETE FROM Identificacion_ISP WHERE Nombre = ?;';
        const params = [nombre];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(
                `Error deleting ISP identification with Nombre "${nombre}": ${err}`
            );
            throw err;
        }
    }
}

export default ISPInfoRepository;

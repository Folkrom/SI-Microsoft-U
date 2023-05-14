class ISPRequestRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getSolicitudISP(entidadPrivada) {
        const query = 'SELECT * FROM Solicitud_ISP WHERE Entidad_Privada = ?;';
        const params = [entidadPrivada];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving ISP request with Entidad_Privada "${entidadPrivada}": ${err}`
            );
            throw err;
        }
    }

    async getAll() {
        const query = 'SELECT * FROM Solicitud_ISP;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving ISP requests: ${err}`);
            throw err;
        }
    }

    async updateSolicitudISP(entidadPrivada, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(entidadPrivada);

        const query = `UPDATE Solicitud_ISP
                     SET ${setClause}
                     WHERE Entidad_Privada = ?;`;

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                values
            );

            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error updating ISP request: ${err}`);
            throw err;
        }
    }

    async createSolicitudISP(solicitudISPData) {
        const query = `INSERT INTO Solicitud_ISP 
                     (Autorizacion, Ampliacion_de_Autorizacion, Entidad_Privada, Autorizacion_Previa_del_ISP, Criterio_de_Referencia, Vigencia, Alcance)
                     VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            solicitudISPData.Autorizacion,
            solicitudISPData.Ampliacion_de_Autorizacion,
            solicitudISPData.Entidad_Privada,
            solicitudISPData.Autorizacion_Previa_del_ISP,
            solicitudISPData.Criterio_de_Referencia,
            solicitudISPData.Vigencia,
            solicitudISPData.Alcance,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating ISP request: ${err}`);
            throw err;
        }
    }

    async deleteSolicitudISP(entidadPrivada) {
        const query = 'DELETE FROM Solicitud_ISP WHERE Entidad_Privada = ?;';
        const params = [entidadPrivada];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(
                `Error deleting ISP request with Entidad_Privada "${entidadPrivada}": ${err}`
            );
            throw err;
        }
    }
}

export default ISPRequestRepository;

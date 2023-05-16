class CertificacionesRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getCertificacion(normaAplicacion, certificado) {
        const query =
            'SELECT * FROM Certificaciones WHERE Norma_de_Aplicacion = ? AND Certificado = ?;';
        const params = [normaAplicacion, certificado];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving certification with Norma_de_Aplicacion "${normaAplicacion}" and Certificado "${certificado}": ${err}`
            );
            throw err;
        }
    }

    async getAllCertificaciones() {
        const query = 'SELECT * FROM Certificaciones;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving certifications: ${err}`);
            throw err;
        }
    }

    async updateCertificacion(Certificado, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(Certificado);

        const query = `UPDATE Certificaciones
                       SET ${setClause}
                       WHERE Certificado = ?;`;

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                values
            );

            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error updating certification: ${err}`);
            throw err;
        }
    }

    async createCertificacion(certificacionData) {
        const query = `INSERT INTO Certificaciones 
                     (Norma_de_Aplicacion, Certificado, Alcance, Año, Validez)
                     VALUES (?, ?, ?, ?, ?);`;
        const params = [
            certificacionData.Norma_de_Aplicacion,
            certificacionData.Certificado,
            certificacionData.Alcance,
            certificacionData.Año,
            certificacionData.Validez,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating certification: ${err}`);
            throw err;
        }
    }

    async deleteCertificacion(normaAplicacion) {
        const query =
            'DELETE FROM Certificaciones WHERE Norma_de_Aplicacion = ?;';
        const params = [normaAplicacion];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(
                `Error deleting certification with Norma_de_Aplicacion "${normaAplicacion}": ${err}`
            );
            throw err;
        }
    }
}

export default CertificacionesRepository;

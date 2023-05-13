class FormatoOrganizacionalRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getEmpleado(id) {
        const query =
            'SELECT * FROM Formato_Organizacional WHERE ID_Empleado = ?;';
        const params = [id];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving employee with ID "${id}": ${err}`);
            throw err;
        }
    }

    async getAllEmpleados() {
        const query = 'SELECT * FROM Formato_Organizacional;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving employees: ${err}`);
            throw err;
        }
    }

    async updateEmpleado(id, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(id);

        const query = `UPDATE Formato_Organizacional
                 SET ${setClause}
                 WHERE ID_Empleado = ?;`;

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                values
            );

            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error updating employee: ${err}`);
            throw err;
        }
    }
    async createEmpleado(empleadoData) {
        const query = `INSERT INTO Formato_Organizacional
                   (ID_Empleado, Edad, Genero, Puesto, Area, CURP, RFC, Telefono, Correo,
                    Pais_de_Origen, Cede, Escolaridad, Diplomados, Certificaciones, Idiomas)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            empleadoData.ID_Empleado,
            empleadoData.Edad,
            empleadoData.Genero,
            empleadoData.Puesto,
            empleadoData.Area,
            empleadoData.CURP,
            empleadoData.RFC,
            empleadoData.Telefono,
            empleadoData.Correo,
            empleadoData.Pais_de_Origen,
            empleadoData.Cede,
            empleadoData.Escolaridad,
            empleadoData.Diplomados,
            empleadoData.Certificaciones,
            empleadoData.Idiomas,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating employee: ${err}`);
            throw err;
        }
    }

    async deleteEmpleado(id) {
        const query =
            'DELETE FROM Formato_Organizacional WHERE ID_Empleado = ?;';
        const params = [id];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;
            return true;
        } catch (err) {
            console.error(`Error deleting employee with ID "${id}": ${err}`);
            throw err;
        }
    }
}

export default FormatoOrganizacionalRepository;

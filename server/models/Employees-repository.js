class EmployeesRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getEmployee(id_empleado) {
        const query = 'SELECT * FROM Empleados WHERE id_empleado = ?;';
        const params = [id_empleado];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving employee with id "${id}": ${err}`);
            throw err;
        }
    }

    async getAll() {
        const query = 'SELECT * FROM Empleados;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving employees: ${err}`);
            throw err;
        }
    }

    async updateEmployee(id, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(id);

        const query = `UPDATE Empleados
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
            console.error(`Error updating employee: ${err}`);
            throw err;
        }
    }

    async createEmployee(employeeData) {
        const query = `INSERT INTO Empleados 
                     (nombre_solicitante, id_empleado, edad, genero, puesto, area, curp, rfc, salario_neto, salario_bruto, sede, horario, telefono, correo, pais_origen, domicilio, escolaridad, certificaciones, num_hijos, beneficiarios, enfermedades)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            employeeData.nombre_solicitante,
            employeeData.id_empleado,
            employeeData.edad,
            employeeData.genero,
            employeeData.puesto,
            employeeData.area,
            employeeData.curp,
            employeeData.rfc,
            employeeData.salario_neto,
            employeeData.salario_bruto,
            employeeData.sede,
            employeeData.horario,
            employeeData.telefono,
            employeeData.correo,
            employeeData.pais_origen,
            employeeData.domicilio,
            employeeData.escolaridad,
            employeeData.certificaciones,
            employeeData.num_hijos,
            employeeData.beneficiarios,
            employeeData.enfermedades,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating employee: ${err}`);
            throw err;
        }
    }

    async deleteEmployee(id) {
        const query = 'DELETE FROM Empleados WHERE id = ?;';
        const params = [id];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error deleting employee with id "${id}": ${err}`);
            throw err;
        }
    }
}

export default EmployeesRepository;

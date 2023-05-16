class CustomersRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getCliente(id) {
        const query = 'SELECT * FROM Clientes WHERE id = ?;';
        const params = [id];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(`Error retrieving client with id "${id}": ${err}`);
            throw err;
        }
    }

    async getClienteByNombre(nombreCliente) {
        const query = 'SELECT * FROM Clientes WHERE nombre_cliente = ?;';
        const params = [nombreCliente];

        try {
            const result = await this.dbConnection.executeQuery(query, params);
            return result[0];
        } catch (err) {
            console.error(
                `Error retrieving client with nombre_cliente "${nombreCliente}": ${err}`
            );
            throw err;
        }
    }

    async getAll() {
        const query = 'SELECT * FROM Clientes;';

        try {
            const result = await this.dbConnection.executeQuery(query);
            return result;
        } catch (err) {
            console.error(`Error retrieving clients: ${err}`);
            throw err;
        }
    }

    async updateCliente(id, update) {
        const keys = Object.keys(update);
        const setClause = keys.map((key) => `${key} = ?`).join(', ');
        const values = Object.values(update);
        values.push(id);

        const query = `UPDATE Clientes
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
            console.error(`Error updating client: ${err}`);
            throw err;
        }
    }

    async createCliente(clienteData) {
        const query = `INSERT INTO Clientes 
                     (nombre_cliente, edad, genero, empresa, telefono, curp, rfc, sede, correo, domicilio, alcaldia)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            clienteData.nombre_cliente,
            clienteData.edad,
            clienteData.genero,
            clienteData.empresa,
            clienteData.telefono,
            clienteData.curp,
            clienteData.rfc,
            clienteData.sede,
            clienteData.correo,
            clienteData.domicilio,
            clienteData.alcaldia,
        ];

        try {
            await this.dbConnection.executeQuery(query, params);
            return true;
        } catch (err) {
            console.error(`Error creating client: ${err}`);
            throw err;
        }
    }

    async deleteCliente(id) {
        const query = 'DELETE FROM Clientes WHERE id = ?;';
        const params = [id];

        try {
            const { affectedRows } = await this.dbConnection.executeQuery(
                query,
                params
            );
            if (!affectedRows) return false;

            return true;
        } catch (err) {
            console.error(`Error deleting client with id "${id}": ${err}`);
            throw err;
        }
    }
}

export default CustomersRepository;

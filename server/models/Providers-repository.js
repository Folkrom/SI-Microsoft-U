class ProvidersRepository {
    constructor(dbConnection) {
      this.dbConnection = dbConnection;
    }
  
    async getProveedor(id) {
      const query = 'SELECT * FROM Proveedores WHERE id = ?;';
      const params = [id];
  
      try {
        const result = await this.dbConnection.executeQuery(query, params);
        return result[0];
      } catch (err) {
        console.error(`Error retrieving supplier with id "${id}": ${err}`);
        throw err;
      }
    }
  
    async getAll() {
      const query = 'SELECT * FROM Proveedores;';
  
      try {
        const result = await this.dbConnection.executeQuery(query);
        return result;
      } catch (err) {
        console.error(`Error retrieving suppliers: ${err}`);
        throw err;
      }
    }
  
    async updateProveedor(id, update) {
      const keys = Object.keys(update);
      const setClause = keys.map((key) => `${key} = ?`).join(', ');
      const values = Object.values(update);
      values.push(id);
  
      const query = `UPDATE Proveedores
                     SET ${setClause}
                     WHERE id = ?;`;
  
      try {
        const { affectedRows } = await this.dbConnection.executeQuery(query, values);
  
        if (!affectedRows) return false;
  
        return true;
      } catch (err) {
        console.error(`Error updating supplier: ${err}`);
        throw err;
      }
    }
  
    async createProveedor(proveedorData) {
      const query = `INSERT INTO Proveedores 
                     (nombre_proveedor, rfc, numero_contacto, producto_servicio, precio_unitario, fecha_entrega, forma_pago, garantia_servicio_producto, fecha_inicio_relacion, contacto_principal, domicilio_proveedor)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const params = [
        proveedorData.nombre_proveedor,
        proveedorData.rfc,
        proveedorData.numero_contacto,
        proveedorData.producto_servicio,
        proveedorData.precio_unitario,
        proveedorData.fecha_entrega,
        proveedorData.forma_pago,
        proveedorData.garantia_servicio_producto,
        proveedorData.fecha_inicio_relacion,
        proveedorData.contacto_principal,
        proveedorData.domicilio_proveedor
      ];
  
      try {
        await this.dbConnection.executeQuery(query, params);
        return true;
      } catch (err) {
        console.error(`Error creating supplier: ${err}`);
        throw err;
      }
    }
  
    async deleteProveedor(id) {
      const query = 'DELETE FROM Proveedores WHERE id = ?;';
      const params = [id];
  
      try {
        const { affectedRows } = await this.dbConnection.executeQuery(query, params);
        if (!affectedRows) return false;
  
        return true;
      } catch (err) {
        console.error(`Error deleting supplier with id "${id}": ${err}`);
        throw err;
      }
    }
  }
  
  export default ProvidersRepository;
  
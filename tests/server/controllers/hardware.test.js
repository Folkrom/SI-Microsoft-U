import HardwareRepository from '../../../server/models/hardware-repository';
import {
    getAllHardware,
    createHardware,
} from '../../../server/controllers/hardware';
import DatabaseConnection from '../../../server/models/database-connection';
import dbConfig from '../../../server/database/config';

describe('Hardware controllers', () => {
    const dbConnection = new DatabaseConnection(dbConfig);
    const hardwareRepository = new HardwareRepository(dbConnection);

    it('should return a JSON containing all existing hardware (3 items)', async () => {
        const expectedResponse = [
            {
                id: 1,
                nombre_dispositivo: 'Laptop',
                fabricante: 'HP',
                fecha_compra: '2023-01-15T06:00:00.000Z',
                especificaciones_tecnicas: 'Intel Core i7, 16GB RAM, 512GB SSD',
                precio: '1500.00',
                cantidad_stock: 10,
            },
            {
                id: 2,
                nombre_dispositivo: 'Smartphone',
                fabricante: 'Samsung',
                fecha_compra: '2023-03-02T06:00:00.000Z',
                especificaciones_tecnicas:
                    'Qualcomm Snapdragon 888, 8GB RAM, 256GB',
                precio: '1000.00',
                cantidad_stock: 20,
            },
            {
                id: 3,
                nombre_dispositivo: 'Monitor',
                fabricante: 'Dell',
                fecha_compra: '2023-02-10T06:00:00.000Z',
                especificaciones_tecnicas: '27", 1440p, 165Hz',
                precio: '500.00',
                cantidad_stock: 15,
            },
        ];

        const result = await hardwareRepository.getAllHardware();
        
        for (const res of result)
            res.fecha_compra = res.fecha_compra.toISOString();

        expect(result).toEqual(expectedResponse);
    });
});

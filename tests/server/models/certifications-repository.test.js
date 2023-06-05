import DatabaseConnection from '../../../server/models/database-connection';
import CertificacionesRepository from '../../../server/models/certifications-repository';
import dbConfig from '../../../server/database/config';

describe('CertificacionesRepository', () => {
    const databaseConnection = new DatabaseConnection(dbConfig);
    const certificacionesRepository = new CertificacionesRepository(
        databaseConnection
    );

    describe('getCertificacion', () => {
        it('should return the certification with the given normaAplicacion and certificado', async () => {
            // Arrange
            const normaAplicacion = 'AWS Solutions Architect';
            const certificado =
                'Certificado de arquitectura de soluciones de AWS';
            const expectedCertificacion = {
                Norma_de_Aplicacion: 'AWS Solutions Architect',
                Certificado: 'Certificado de arquitectura de soluciones de AWS',
                Alcance: 'Arquitectura de soluciones en la nube',
                Año: '2023-05-01T05:00:00.000Z',
                Validez: '2 años',
            };

            // Act
            const result = await certificacionesRepository.getCertificacion(
                normaAplicacion,
                certificado
            );

            result.Año = result.Año.toISOString();

            // Assert
            expect(result).toEqual(expectedCertificacion);
        });

        // Agrega más tests para diferentes casos
    });

    describe('getAllCertificaciones', () => {
        it('should return all certifications', async () => {
            const expectedCertificaciones = [
                {
                    Norma_de_Aplicacion: 'ISO 27001',
                    Certificado: 'Certificado de seguridad de la información',
                    Alcance:
                        'Sistemas de gestión de seguridad de la información',
                    Año: '2021-01-01T06:00:00.000Z',
                    Validez: '3 años',
                },
                {
                    Norma_de_Aplicacion: 'ITIL 4',
                    Certificado: 'Certificado de gestión de servicios de TI',
                    Alcance: 'Gestión de servicios de TI',
                    Año: '2022-03-15T06:00:00.000Z',
                    Validez: '5 años',
                },
                {
                    Norma_de_Aplicacion: 'AWS Solutions Architect',
                    Certificado:
                        'Certificado de arquitectura de soluciones de AWS',
                    Alcance: 'Arquitectura de soluciones en la nube',
                    Año: '2023-05-01T05:00:00.000Z',
                    Validez: '2 años',
                },
            ];

            const result =
                await certificacionesRepository.getAllCertificaciones();
            for (const res of result) res.Año = res.Año.toISOString();

            expect(result).toEqual(expectedCertificaciones);
        });
    });

    // describe('updateCertificacion', () => {
    //     it('should update the specified certification', async () => {
    //         const normaAplicacion = 'ISO 27001';
    //         const certificado = 'Certificado de seguridad TI';
    //         const update = {
    //             Alcance: 'Nuevo alcance',
    //             Año: '2023-06-01T00:00:00.000Z',
    //             Validez: '5 años',
    //         };

    //         const result = await certificacionesRepository.updateCertificacion(
    //             certificado,
    //             update
    //         );

    //         // Assert
    //         expect(result).toBe(true);

    //         // Verificar que los cambios se hayan aplicado correctamente
    //         const updatedCertificacion =
    //             await certificacionesRepository.getCertificacion(
    //                 normaAplicacion,
    //                 certificado
    //             );
    //         expect(updatedCertificacion).toEqual({
    //             Norma_de_Aplicacion: normaAplicacion,
    //             Certificado: certificado,
    //             Alcance: update.Alcance,
    //             Año: new Date(update.Año),
    //             Validez: update.Validez,
    //         });
    //     });
    // });

    describe('createCertificacion', () => {
        it('should create a new certification', async () => {
            const certificacionData = {
                Norma_de_Aplicacion: 'ISO 9000',
                Certificado: 'Iso 9001',
                Alcance: 'Alcance de la certificación',
                Año: '2023-01-01',
                Validez: '1 año',
            };

            const result = await certificacionesRepository.createCertificacion(
                certificacionData
            );

            expect(result).toBe(true);

            // Erasing test certification
            await certificacionesRepository.deleteCertificacion(
                certificacionData.Norma_de_Aplicacion
            );
        });
    });

    describe('deleteCertificacion', () => {
        it('should delete a certification', async () => {
            const certificacionData = {
                Norma_de_Aplicacion: 'ISO 9000',
                Certificado: 'Iso 9001',
                Alcance: 'Alcance de la certificación',
                Año: '2023-01-01',
                Validez: '1 año',
            };

            await certificacionesRepository.createCertificacion(
                certificacionData
            );

            const result = await certificacionesRepository.deleteCertificacion(
                certificacionData.Norma_de_Aplicacion
            );
            expect(result).toBe(true);
        });
    });
});

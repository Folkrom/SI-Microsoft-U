import CertificacionesRepository from '../models/certifications-repository.js';

const certificacionesRepository = new CertificacionesRepository();

const deleteCertification = async (req, res) => {
    const { normaAplicacion } = req.params;

    try {
        const result = await certificacionesRepository.deleteCertificacion(
            normaAplicacion
        );
        if (!result) {
            return res.status(404).json({
                err: `La certificacion con la norma de aplicacion ${normaAplicacion} no existe.`,
            });
        }

        res.status(200).json({
            err: `La certificacion con la norma de aplicacion ${normaAplicacion} ha sido eliminada exitosamente.`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export { deleteCertification };

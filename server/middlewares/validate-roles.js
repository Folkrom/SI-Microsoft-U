
const isAdminRole = async (req, res, next) => {
    const role = req.cookies['x-role'];;

    if (!role) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero',
        });
    }

    if (role !== 'admin') {
        return res.status(401).json({
            msg: 'No es administrador - No puede hacer esto',
        });
    }

    next();
};

export { isAdminRole };

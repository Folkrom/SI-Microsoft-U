
const isAdminRole = (req, res, next) => {
    const role = req.cookies['x-role'];

    if (!role) {
        return res.status(401).json({
            msg: 'No se ha proporcionado el rol.',
        });
    }

    if (role !== 'Administrador' && role !== 'CEO') {
        return res.status(403).json({
            msg: 'No tiene permisos suficientes para realizar esta acción.',
        });
    }

    next();
};

export { isAdminRole };

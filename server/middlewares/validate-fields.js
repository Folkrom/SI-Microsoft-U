import { validationResult } from 'express-validator';

/**
 * This function validates fields and returns errors if any.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to move on to the next function after the current middleware
 * function has completed its task. In this case, `next` is called if there are no validation errors,
 * indicating that
 * @returns If there are validation errors in the `req` object, a JSON response with a status code of
 * 400 and the mapped errors will be returned. Otherwise, the `next()` function will be called to
 * proceed to the next middleware function.
 */
const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) 
        return res.status(400).json(errors.mapped());

    next();
}

export {
    validateFields
}

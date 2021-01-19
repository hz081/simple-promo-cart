import Boom from "boom";

export const wrapError = (e: any) => {
    if (!e.response) {
        return Boom.badRequest('internal server error');
    }
    let err: any = {};
    const code = e.response.status.toString();
    const data = e.response.data;
    switch(code) {
        case '400': err = wrapDataError(Boom.badRequest(data.message), data.details); break;
        case '404': err = wrapDataError(Boom.notFound(data.message), data.details); break;
        case '401': err = wrapDataError(Boom.unauthorized(data.message), data.details); break;
        case '409': err = wrapDataError(Boom.conflict(data.message), data.details); break;
        case '422': err = wrapDataError(Boom.badData(data.message, data.details)); break;
    }
    return err;
};

export const wrapDataError = (e: any, data?: any) => {
    if (e && e.output) (e.output.payload as any).details = e.data || data;
    return e;
};

export const formatErrorMessage = (error: any) => {
    const detailError: any = {};
    if (error.details) {
        error.details.forEach((err: any) => {
        if (!detailError[err.context.key]) detailError[err.context.key] = [];
        detailError[err.context.key].push(err.message);
        });
    }
    return detailError;
};
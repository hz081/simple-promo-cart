export const validate = async (request: Request, h: any) => {

    const headers = request.headers as any;
    const authorization = headers.authorization;

    const isValid = (authorization === 'Basic ' + process.env.PRIVATE_TOKEN);
    const credentials = { };

    return { isValid, credentials };
};
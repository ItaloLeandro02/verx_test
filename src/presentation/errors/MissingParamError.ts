export class MissingError extends Error {
    constructor(paramName: string) {
        super(`Missing param: ${paramName}`);
        this.name = 'MissingParamError';
    }
}
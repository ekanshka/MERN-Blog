// interface CustomError extends Error {
//     statusCode: number;
// }

// export const errorHandler = (statusCode: number, message: string): CustomError => {
//     const error = Error(message) as CustomError;
//     error.statusCode = statusCode;
//     return error;
// }



export const errorHandler = (message) => {
    const error = new Error(message);       //does not support status code
    return error;       //return the error anywhere please dont throw error!!! it breaks the server!
}

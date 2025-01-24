class ApiError extends Error {
    constructor(message="something went wrong", statusCode,errors) {
        super(message);
        this.statusCode = statusCode;
        this.data=null;
        this.errors = errors;
        this.sucess=false;
    }
}

export {ApiError}
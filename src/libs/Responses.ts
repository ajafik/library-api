class Responses {
    constructor() {
        return this;
    }
    public success(errorCode, message) {
        return {
            error: false,
            errorCode,
            message,
        };
    }
    public error(errorCode, message) {
        return {
            error: false,
            errorCode,
            message,
        };
    }

    public output(errorCode, data, count = 0) {
        return {
            count,
            data,
            error: false,
            errorCode,
        };
    }

}

export const responsesHelper = new Responses();

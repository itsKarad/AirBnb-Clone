// HttpError is inherited from Error class
class HttpError extends Error {
    constructor(message, status){
        super(message); // add message to the Error object
        this.code = status; // add a code to the Error object
    }
}

module.exports = HttpError;
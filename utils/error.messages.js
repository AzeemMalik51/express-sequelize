// Error messages 

module.exports = {
    missingRequiredHeader: {
        error: true,
        message: "A required HTTP header was not specified.",
        status: 400
    },
    missingRequiredQueryParameter: {
        error: true,
        message: "A required query parameter was not specified for this request.",
        status: 400
    },
    inValidEmail: {
        error: true,
        message: "The given email is not valid.",
        status: 400
    },
    inValidPassword: {
        error: true,
        message: "The given password is not valid.",
        status: 400
    },
    authenticationFail: {
        error: true,
        message: "The given email or password is not valid.",
        status: 400
    },
    unAuthorized: {
        error: true,
        message: "You are not authorized to access this.",
        status: 401
    },
    forbidden: {
        error: true,
        message: "You are forbidden to access this.",
        status: 403
    },
    accountIsDisabled: {
        error: true,
        message: "The specified account is disabled.",
        status: 403
    },
    accountAlreadyExists: {
        error: true,
        message: "The specified account already exists.",
        status: 409
    },
    resourceAlreadyExists: {
        error: true,
        message: "The specified resource already exists.",
        status: 409
    },
    notFound: {
        error: true,
        message: "The specified resource does not exist.",
        status: 404
    },
    internalServerError: {
        error: true,
        message: "The server encountered an internal error. Please retry the request.",
        status: 500
    },
    inActiveUser: {
        error: true,
        message: "The specified user is Inactive.",
        status: 403
    }

};
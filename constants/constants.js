module.exports = {
    'snackBarDuration': 5,
    user: {
        roles: {
            ADMIN: "ADMIN",
            USER: "USER",
            GM: "GM"
        },
        Departments: {
            HR: 'HR',
            OPERATIONS: 'OPERATIONS',
            RECRUITMENT: 'RECRUITMENT'
        },
        defaultPassword: "Word2Pass"
    },
    
   
    environments: {
        DEVELOPEMENT: 'development', //on local system
        TESTING: 'testing',
        LIVE: 'live'
    },
    type: {
        NOTE: 'NOTE',
        ISSUE: 'ISSUE'
    },

};
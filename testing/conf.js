exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
        auth: 'specs/auth.js',
        corp: 'specs/corp.js',
        crew: 'specs/app/crew.js',
        employee: 'specs/app/employee.js',
        timekeeping: 'specs/app/timekeeping.js',
        full: 'specs/*.js'
    },
    /*multiCapabilities: [{
        'browserName': 'chrome'
    }, {
        'browserName': 'firefox'
    }]*/
};
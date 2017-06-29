exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
        auth: 'specs/auth.js',
        app: 'specs/app.js',
        corp: 'specs/corp.js',
        full: 'specs/*.js'
    },
    multiCapabilities: [{
        'browserName': 'chrome'
    }, {
        'browserName': 'firefox'
    }]
};
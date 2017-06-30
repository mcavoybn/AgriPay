(function () {

    /* Timekeeping Tests */
    describe('Timekeeping Testing', function () {
        beforeEach(function () {
            goToPage('timeEntry');
        });


    });    

    /* Helper Functions */
    function goToPage (page) {
        browser.get("http://localhost:5000/" + page);
    }

    function hasClass (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    }

    function openApplicationInBrowser () {
        browser.get("http://localhost:5000/");
    }

    function testLogin (email, password) {
        element(by.model('email')).click();
        element(by.model('email')).sendKeys(email);

        element(by.model('password')).click();
        element(by.model('password')).sendKeys(password);
        element(by.className('submitbutton')).click();
    }

})();
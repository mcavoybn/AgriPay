(function () {

    /****** Auth Tests ******/
    /* Login Tests */
    describe('Login Testing', function () {
        beforeEach(function () {
            goToPage('login');
        });

        it('should give invalid field message when email is not an email', function () {
            element(by.model('email')).click();
            element(by.model('email')).sendKeys('lkhsglhs');            
            element(by.className('submitbutton')).click();

            expect(hasClass(element(by.model('email')), 'ng-invalid')).toBe(true);
        });

        /* Failing this test, not sure how to compare the ng-shown element with text? */
        it('should give error message when login fails', function () {
            testLogin('jgraziano2@gmail.com', 'passwordIncorrect')

            browser.sleep(2500);
            expect(element(by.binding('message')).getText()).toEqual('The password is invalid or the user does not have a password.');
        });

        it('should be able to navigate to the register page', function () {
            element(by.linkText('Register')).click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:5000/register');
        });

        it('should login when email and password are correct', function () {
            testLogin('jgraziano2@gmail.com', 'password');

            browser.sleep(2500);
            expect(browser.getCurrentUrl()).toEqual('http://localhost:5000/crews');
        });
    });

    /* Register Tests */
    describe('Register Testing', function () {
        beforeEach(function () {
            goToPage('register');
        });

        it('should give invalid field message when email is not an email', function () {
            element(by.model('email')).click();
            element(by.model('email')).sendKeys('lkhsglhs');            
            element(by.className('submitbutton')).click();

            expect(hasClass(element(by.model('email')), 'ng-invalid')).toBe(true);
        });

        /* Failing this test, not sure how to compare the ng-shown element with text? */
        it('should give error message when login fails', function () {
            testLogin('jgraziano2@gmail.com', 'passwordIncorrect')

            browser.sleep(2500);
            expect(element(by.binding('message')).getText()).toEqual('The email address is already in use by another account.');
        });

        it('should be able to navigate to the Login page', function () {
            element(by.linkText('Login')).click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:5000/login');
        });

        it('should give error message when user already exists', function () {
            testLogin('jgraziano2@gmail.com', 'password');

            browser.sleep(2500);
            expect(element(by.binding('message')).getText()).toEqual('The email address is already in use by another account.');
        });

        it('should register when email and password are valid', function () {
            testLogin('jgraziano3@gmail.com', 'password');

            browser.sleep(2500);
            expect(browser.getCurrentUrl()).toEqual('http://localhost:5000/crews');
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
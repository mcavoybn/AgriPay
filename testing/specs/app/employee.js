(function () {

    /* Employee Tests */
    describe('Employee Testing', function () {
        beforeEach(function () {
            goToPage('login');
            testLogin('jgraziano2@gmail.com', 'password');

            browser.sleep(2500);
            goToPage('employees');
        });

        it('should create a new employee', function() {
            browser.sleep(2000);
            element(by.buttonText('Create New Employee')).click(); 

            browser.sleep(2000);
            element(by.cssContainingText('option', 'W2')).click();
            element(by.cssContainingText('option', 'Female')).click();
            element(by.cssContainingText('option', 'Watermelon Wranglers')).click();
            element(by.model('vm.employee.firstName')).sendKeys('Michelle');
            element(by.model('vm.employee.lastName')).sendKeys('Allred');
            element(by.model('vm.employee.middle')).sendKeys('K');
            element(by.model('vm.employee.ssn')).sendKeys('123456789');
            element(by.model('vm.employee.dateOfBirth')).sendKeys('11/29/1992');
            element(by.model('vm.employee.employeeId')).sendKeys('1010102');
            element(by.model('vm.employee.address1')).sendKeys('3045 Apple Street');
            element(by.model('vm.employee.address2')).sendKeys('');
            element(by.model('vm.employee.city')).sendKeys('Boise');
            element(by.model('vm.employee.state')).sendKeys('ID');
            element(by.model('vm.employee.zip')).sendKeys('83706');
            element(by.model('vm.employee.phone')).sendKeys('2089653214');
            element(by.model('vm.employee.rate')).sendKeys('10.00');

            element(by.buttonText('Save')).click();

            let el = element(by.className('list-unstyled'));
            el.getText().then(function(text){expect(text).toContain("Michelle")});
        });

        it('should be able to search for an employee', function() {
            browser.sleep(2000);
            element(by.model('searchText.firstName')).sendKeys('Michelle');
            
            browser.sleep(2000);
            let el = element(by.className('list-unstyled'));
            el.getText().then(function(text){expect(text).toContain("Michelle")});
        });
        
        it('should not find an employee that is not in the list', function() {
            browser.sleep(2000);
            element(by.model('searchText.firstName')).sendKeys('ghsjadgkjdh');
            
            browser.sleep(2000);
            let el = element(by.className('list-unstyled'));
            el.getText().then(function(text){expect(text).toEqual('')});
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
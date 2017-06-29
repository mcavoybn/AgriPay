(function () {
    
    /* Corporate Tests */
    /*describe('Logging In', function () {
        beforeEach(function () {
             goToPage('');
        });        
        
        it('should be able to navigate to login page', function () {
            Click Login button
        });
        
        it('should be able to navigate to register page', function () {
            Click Register button
        });
        
    });*/
    
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
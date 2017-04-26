module.exports = {
    'test index page' : function (browser) {
        browser
            .url('http://localhost:3000')
            .pause(1000)

        browser.expect.element('span#app-title').text.to.equal("Berargumen");

        browser.end();
    }
};
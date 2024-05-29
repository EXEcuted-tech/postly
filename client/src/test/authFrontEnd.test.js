const { Builder, By, until } = require('selenium-webdriver');
const {cleanTestData} = require('./commonFunction')
let driver;

const {testConfig, registerAccount} = require('./commonFunction');
const URL = testConfig;

//=======================
//  SIGN UP TEST CASES 
//=======================
describe('Sign Up', () => {
    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(`${URL}`);
    });
    
    afterAll(async () => {
        await cleanTestData('19103523@usc.edu.ph');
        await driver.quit();
    });

    test('Should successfully register an account', async () => {
        let btn = await driver.findElement(By.name('createAccButton'));
        await btn.click();

        await driver.findElement(By.name("username")).sendKeys("katteu_cutie");
        await driver.findElement(By.name("email")).sendKeys("19103523@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("password");
        await driver.findElement(By.name("confirmpassword")).sendKeys("password");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('text-base')), 10000);
        const title = await driver.findElement(By.className('text-base')).getText();
        expect(title).toBe('Registered Successfully!');
    });
  
    // test('Displays error notification when username is not inputted', async () => {

    // });
  
    // test('Should input a valid email', async () => {

    // });

    // test('Should input matching passwords', async () => {

    //   });

    // test('Should input password at least 8 characters', async () => {

    // });
});


//=====================
//  LOG IN TEST CASES 
//=====================
describe('Log In', () => {
    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(`${URL}`);
        await registerAccount(driver); 
    });
    
    afterAll(async () => {
        await cleanTestData('19103523@usc.edu.ph');
        await driver.quit();
    });

    test('Should successfully login to the application', async () => {
        await driver.wait(until.elementLocated(By.name('loginButton')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('loginButton'))), 10000);
        await driver.wait(until.elementIsEnabled(driver.findElement(By.name('loginButton'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('loginButton'))), 10000);
        await driver.wait(until.elementIsEnabled(driver.findElement(By.name('loginButton'))), 10000);
        await driver.wait(until.elementLocated(By.name('loginButton')), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('loginButton'))), 10000);
        await driver.wait(until.elementIsEnabled(driver.findElement(By.name('loginButton'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('loginButton'))), 10000);
        await driver.wait(until.elementIsEnabled(driver.findElement(By.name('loginButton'))), 10000);

        let btn = await driver.findElement(By.name('loginButton'));
        await btn.click();

        await driver.findElement(By.name("un_email")).sendKeys("katteu_cutie");
        await driver.findElement(By.name("password")).sendKeys("password");

        let btnSignIn = await driver.findElement(By.name('login-btn'));
        await btnSignIn.click();

        await driver.wait(until.elementLocated(By.className('bg-[#F3F5F7]')), 10000);
        const element = await driver.findElement(By.className('bg-[#F3F5F7]'));
        const classes = await element.getAttribute('class');
        expect(classes).toContain('bg-[#F3F5F7]');        
    });
});
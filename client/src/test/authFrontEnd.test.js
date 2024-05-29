const { Builder, By, until, Key } = require('selenium-webdriver');
const {cleanTestData, loginAccount} = require('./commonFunction')
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
  
    test('Displays error notification when username is not inputted', async () => {
        let btn = await driver.findElement(By.name('createAccButton'));
        await btn.click();

        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("");
        await driver.findElement(By.name("email")).sendKeys("191035234@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("password");
        await driver.findElement(By.name("confirmpassword")).sendKeys("password");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Username is required!');
    });

    test('Displays error notification when username is less than 4 characters', async () => {
        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("usc");
        await driver.findElement(By.name("email")).sendKeys("katheamari@gmail.com");
        await driver.findElement(By.name("password")).sendKeys("password");
        await driver.findElement(By.name("confirmpassword")).sendKeys("password");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Username must be 4-15 characters long.');
    });

    test('Displays error notification when username is greater than 15 characters', async () => {
        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("uscLorem ipsum dolo");
        await driver.findElement(By.name("email")).sendKeys("katheamari@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("password");
        await driver.findElement(By.name("confirmpassword")).sendKeys("password");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Username must be 4-15 characters long.');        
    });
    
    test('Displays error notification when valid email is not inputted', async () => {
        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("katteu_cutiez");
        await driver.findElement(By.name("email")).sendKeys("test");
        await driver.findElement(By.name("password")).sendKeys("password");
        await driver.findElement(By.name("confirmpassword")).sendKeys("password");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Please enter a valid email!'); 
    });

    test('Displays error notification when email already exists', async () => {
        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("katteu_cutiez");
        await driver.findElement(By.name("email")).sendKeys("19103523@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("password");
        await driver.findElement(By.name("confirmpassword")).sendKeys("password");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Email address or account handle already exists!'); 
    });

    test('Displays error notification when account handle already exists', async () => {
        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("katteu_cutie");
        await driver.findElement(By.name("email")).sendKeys("191035234@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("password");
        await driver.findElement(By.name("confirmpassword")).sendKeys("password");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Email address or account handle already exists!'); 
    });

    test('Displays error notification when password is not filled', async () => {
        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("katteu_cutiez");
        await driver.findElement(By.name("email")).sendKeys("191035234@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("");
        await driver.findElement(By.name("confirmpassword")).sendKeys("password");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Please check the typed password again!'); 
    });

    test('Displays error notification when passwords do not match', async () => {
        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("katteu_cutiez");
        await driver.findElement(By.name("email")).sendKeys("191035234@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("password");
        await driver.findElement(By.name("confirmpassword")).sendKeys("passwordzz");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Please check the typed password again!'); 
    });

    test('Should input password at least 8 characters', async () => {
        await driver.findElement(By.name("username")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("confirmpassword")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("username")).sendKeys("katteu_cutiez");
        await driver.findElement(By.name("email")).sendKeys("191035234@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("pass");
        await driver.findElement(By.name("confirmpassword")).sendKeys("pass");

        let btnSign = await driver.findElement(By.name('signup-btn'));
        await btnSign.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Password must be at least 8 characters long.'); 

        let btnClose = await driver.findElement(By.name('signup-close'));
        await btnClose.click();
    });
});


//=====================
//  LOG IN TEST CASES 
//=====================
describe('Log In', () => {
    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(`${URL}`);
        await registerAccount(driver); 
    },30000);
    
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

    test('Displays error notification when username is not inputted', async () => {
        await driver.navigate().back();

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

        await driver.findElement(By.name("un_email")).sendKeys("");
        await driver.findElement(By.name("password")).sendKeys("password");

        let btnSignIn = await driver.findElement(By.name('login-btn'));
        await btnSignIn.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Username or email is required!');       
    });

    test('Displays error notification when password is not inputted', async () => {
        await driver.findElement(By.name("un_email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("un_email")).sendKeys("katteu_cutie");
        await driver.findElement(By.name("password")).sendKeys("");

        let btnSignIn = await driver.findElement(By.name('login-btn'));
        await btnSignIn.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Password is required!');       
    });

    test('Displays error notification when credentials are invalid', async () => {
        await driver.findElement(By.name("un_email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("un_email")).sendKeys("19103523@usc.edu.ph");
        await driver.findElement(By.name("password")).sendKeys("passwieeerd");

        let btnSignIn = await driver.findElement(By.name('login-btn'));
        await btnSignIn.click();

        await driver.wait(until.elementLocated(By.className('leading-6')), 1000);
        const title = await driver.findElement(By.className('leading-6')).getText();
        expect(title).toBe('Error!');       
    });

    test('Displays error notification when account does not exist', async () => {
        await driver.findElement(By.name("un_email")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
        await driver.findElement(By.name("password")).sendKeys(Key.CONTROL, 'a', Key.DELETE);

        await driver.findElement(By.name("un_email")).sendKeys("non-existent@gmail.com");
        await driver.findElement(By.name("password")).sendKeys("passwirdzz");

        let btnSignIn = await driver.findElement(By.name('login-btn'));
        await btnSignIn.click();

        await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
        const msg = await driver.findElement(By.className('leading-5')).getText();
        expect(msg).toBe('Account does not exist!');
        
        let btnClose = await driver.findElement(By.name('login-close'));
        await btnClose.click();
    });
});

//======================
//  LOG OUT TEST CASE 
//======================
describe('Log Out', () => {

    beforeAll(async () => {
        //jest.setTimeout(10000);
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(`${URL}`);
        await registerAccount(driver); 
        await loginAccount(driver);
    },30000);
    
    afterAll(async () => {
        await cleanTestData('19103523@usc.edu.ph');
        await driver.quit();
    });

    test('Should successfully log out the application', async () => {
        let btn = await driver.findElement(By.id('logout'));
        await btn.click();

        let btnLogout = await driver.findElement(By.name('logout-btn'));
        await btnLogout.click();
        await driver.sleep(1000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe(`${URL}/`); 
    });
});
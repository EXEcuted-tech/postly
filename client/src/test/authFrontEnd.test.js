// const { Builder, By, until } = require('selenium-webdriver');
// const {cleanTestData, loginAccount} = require('./commonFunction')
// let driver;

// const {testConfig, registerAccount} = require('./commonFunction');
// const URL = testConfig;

// //=======================
// //  SIGN UP TEST CASES 
// //=======================
// describe('Sign Up', () => {
//     beforeAll(async () => {
//         driver = await new Builder().forBrowser('chrome').build();
//         await driver.get(`${URL}`);
//     });
    
//     afterAll(async () => {
//         await cleanTestData('19103523@usc.edu.ph');
//         await driver.quit();
//     });

//     test('Should successfully register an account', async () => {
//         let btn = await driver.findElement(By.name('createAccButton'));
//         await btn.click();

//         await driver.findElement(By.name("username")).sendKeys("katteu_cutie");
//         await driver.findElement(By.name("email")).sendKeys("19103523@usc.edu.ph");
//         await driver.findElement(By.name("password")).sendKeys("password");
//         await driver.findElement(By.name("confirmpassword")).sendKeys("password");

//         let btnSign = await driver.findElement(By.name('signup-btn'));
//         await btnSign.click();

//         await driver.wait(until.elementLocated(By.className('text-base')), 10000);
//         const title = await driver.findElement(By.className('text-base')).getText();
//         expect(title).toBe('Registered Successfully!');
//     });
  
//     // test('Displays error notification when username is not inputted', async () => {

//     // });
  
//     // test('Should input a valid email', async () => {

//     // });

//     // test('Should input matching passwords', async () => {

//     //   });

//     // test('Should input password at least 8 characters', async () => {

//     // });
// });


// //=====================
// //  LOG IN TEST CASES 
// //=====================
// describe('Log In', () => {
//     beforeAll(async () => {
//         driver = await new Builder().forBrowser('chrome').build();
//         await driver.get(`${URL}`);
//         await registerAccount(driver); 
//     });
    
//     afterAll(async () => {
//         await cleanTestData('19103523@usc.edu.ph');
//         await driver.quit();
//     });

// });
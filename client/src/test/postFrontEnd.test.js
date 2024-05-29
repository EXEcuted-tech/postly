const { Builder, By, until } = require('selenium-webdriver');
const {cleanTestData, loginAccount} = require('./commonFunction')
let driver;

const {testConfig, registerAccount} = require('./commonFunction');
const URL = testConfig;

//=======================
//  Edit Post Test Cases 
//=======================

describe('Post', () => {  
    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(`${URL}`);
        await registerAccount(driver); 
        await loginAccount(driver);
    });

    afterAll(async () => {
        await cleanTestData('19103523@usc.edu.ph');
        await driver.quit();
    });

    describe('Post Edit', () =>{
        beforeAll(async () => {
            await driver.get(`${URL}/home`);
            let profileBtn = await driver.findElement(By.id('Profile'));
            await profileBtn.click();
            await driver.get(`${URL}/profile`);
        });

        test('Should Edit A Post', async () => {
            let postBtn = await driver.findElement(By.id('Posts'));
            await postBtn.click();
            await driver.wait(until.elementLocated(By.id('editModal')), 5000);
            let editBtn = await driver.findElement(By.name('Edit'));
            await editBtn.click();
        });
    })
  
    // test('Displays error notification when username is not inputted', async () => {

    // });
  
    // test('Should input a valid email', async () => {

    // });

    // test('Should input matching passwords', async () => {

    //   });

    // test('Should input password at least 8 characters', async () => {

    // });
});
const { Builder, By, until } = require('selenium-webdriver');
const {cleanTestData} = require('./commonFunction')
let driver;

const {testConfig, registerAccount, loginAccount} = require('./commonFunction');
const URL = testConfig;

//=======================
//    POST TEST CASES 
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

    describe('Add Post', () =>{
        test('Should successfully add a post on Home Page', async () => {

        });

        test('Should successfully add a post on another page', async () => {

        });
    })

    describe('Edit Post', () =>{
        test('Should successfully add a post', async () => {

        });
    })

    describe('Delete Post', () =>{
        test('Should successfully add a post', async () => {

        });
    })
});
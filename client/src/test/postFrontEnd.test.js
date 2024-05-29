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
        // await registerAccount(driver); 
        await loginAccount(driver);
    });
    
    afterAll(async () => {
        // await cleanTestData('19103523@usc.edu.ph');
        await driver.quit();
    });
    
    describe('Add Post', () =>{
        test('Should successfully add a post on Home Page', async () => {
            let btn = await driver.findElement(By.name('posttextarea'));
            await btn.click();
            let lorem = 'I am good. How are you?'
            await driver.findElement(By.name('posttextarea')).sendKeys(lorem);
            await driver.findElement(By.name('postbutton')).click();
            
            await driver.wait(until.elementLocated(By.id('contentful')), 10000);
            const var1 = await driver.findElement(By.id('contentful')).getText();
            expect(var1).toBe(lorem);
        });

        test('Display error notification when no content is inputted', async () => {
            let btn = await driver.findElement(By.name('posttextarea'));
            await btn.click();

            await driver.findElement(By.name('posttextarea')).sendKeys('');
            await driver.findElement(By.name('postbutton')).click();
            
            await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
            const msg = await driver.findElement(By.className('leading-5')).getText();
            expect(msg).toBe('Content is required and it must be a string!');
        });

        test('Should successfully add a post on another page', async () => {
            let btn = await driver.findElement(By.name('bells'));
            await btn.click();

            let btn1 = await driver.findElement(By.name('createPostBtn'));
            await btn1.click();

            let lorem = 'Lorem ipsum dolor sit amet'
            await driver.findElement(By.name('addpost-textarea')).sendKeys(lorem);
            await driver.findElement(By.name('submitcreatepost')).click();
            
            await driver.get(`${URL}/home`);
            await driver.wait(until.elementLocated(By.id('contentful')), 10000);
            const var1 = await driver.findElement(By.id('contentful')).getText();
            expect(var1).toBe(lorem);
        });

        test('Display error notification when no content is inputted in another page', async () => {
            let btn = await driver.findElement(By.name('bells'));
            await btn.click();

            let btn1 = await driver.findElement(By.name('createPostBtn'));
            await btn1.click();

            await driver.findElement(By.name('addpost-textarea')).sendKeys('');
            await driver.findElement(By.name('submitcreatepost')).click();
            
            await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
            const msg = await driver.findElement(By.className('leading-5')).getText();
            expect(msg).toBe('Content is required and it must be a string!');
        });

    })

    // describe('Edit Post', () =>{
    //     test('Should successfully add a post', async () => {
    //         let btn = await driver.findElement(By.id('helloguys')).click();
    //         await btn.click();
    //     });
    // })

    // describe('Delete Post', () =>{
    //     test('Should successfully add a post', async () => {

    //     });
    // })
});
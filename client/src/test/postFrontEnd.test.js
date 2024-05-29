const { Builder, By, until , Key} = require('selenium-webdriver');
const {testConfig, registerDummyAccount, loginDummyAccount, cleanTestData, cleanTestPost} = require('./commonFunction');

let driver;
const URL = testConfig;

//=======================
//    POST TEST CASES 
//=======================
describe('Post', () => {
    beforeAll(async () => {
        //jest.setTimeout(30000);
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get(`${URL}`);
        await registerDummyAccount(driver); 
        await loginDummyAccount(driver);
    },100000000000);
    
    afterAll(async () => {
        cleanTestData('abcdxyz@gmail.com')
        cleanTestPost('I am good. How are you?')
        cleanTestPost('Lorem ipsum dolor sit ametTesting Edit Automation')
        await driver.quit();
    });
    
    describe('Add Post', () =>{
        test('Should successfully add a post on Home Page', async () => {
            let btn = await driver.findElement(By.name('posttextarea'));
            await btn.click();
            let lorem = 'I am good. How are you?'
            await driver.findElement(By.name('posttextarea')).sendKeys(lorem);
            await driver.findElement(By.name('postbutton')).click();
            
            await driver.wait(until.elementLocated(By.id('contentful')), 1000);
            const var1 = await driver.findElement(By.id('contentful')).getText();
            expect(var1).toBe(lorem);
        },10000000);

        test('Display error notification when no content is inputted', async () => {
            let btn = await driver.findElement(By.name('posttextarea'));
            await btn.click();

            await driver.findElement(By.name('posttextarea')).sendKeys('');
            await driver.findElement(By.name('postbutton')).click();
            
            await driver.wait(until.elementLocated(By.className('leading-5')), 5000);
            const msg = await driver.findElement(By.className('leading-5')).getText();
            expect(msg).toBe('Content is required and it must be a string!');
        },10000000);

        test('Should successfully add a post on another page', async () => {
            let btn = await driver.findElement(By.name('notifications'));
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
        },10000000);

        test('Display error notification when no content is inputted in another page', async () => {
            let btn = await driver.findElement(By.name('notifications'));
            await btn.click();

            let btn1 = await driver.findElement(By.name('createPostBtn'));
            await btn1.click();

            await driver.findElement(By.name('addpost-textarea')).sendKeys('');
            await driver.findElement(By.name('submitcreatepost')).click();
            
            await driver.wait(until.elementLocated(By.className('leading-5')), 10000);
            const msg = await driver.findElement(By.className('leading-5')).getText();
            expect(msg).toBe('Content is required and it must be a string!');

            const btnClose = await driver.findElement(By.name('post-close'));
            await btnClose.click();
        },10000000);

    })

    describe('Edit Post', () =>{
        test('Should successfully edit a post', async () => {
            await driver.findElement(By.id('Profile')).click();
            await driver.wait(until.elementLocated(By.name('Edit')), 1000000);
            await driver.findElement(By.name('Edit')).click()
            await driver.findElement(By.name('EditArea')).sendKeys('Testing Edit Automation')
            await driver.findElement(By.name('SaveEdits')).click()
            await driver.wait(until.elementLocated(By.name('Edit')), 1000000);
        },10000000);

        test('Display error notification when no content is inputted', async () => {
            await driver.sleep(5000);
            await driver.wait(until.elementLocated(By.name('Edit')), 1000000);
            await driver.findElement(By.name('Edit')).click()
            await driver.findElement(By.name("EditArea")).sendKeys(Key.CONTROL, 'a', Key.DELETE);
            await driver.findElement(By.name('SaveEdits')).click()
            await driver.findElement(By.name('CloseEdit')).click()
        },10000000);
    })

    describe('Delete Post', () =>{
        test('Should successfully delete a post', async () => {
            await driver.findElement(By.id('Profile')).click();
            await driver.wait(until.elementLocated(By.name('Delete')), 1000000);
            await driver.findElement(By.name('Delete')).click()
            await driver.findElement(By.name('ConfirmDelete')).click()
            await driver.wait(until.elementLocated(By.name('Delete')), 1000000);
        },10000000);
    })
});
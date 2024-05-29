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
            let btn = await driver.findElement(By.name('createAccButton'));
            await btn.click();
            let lorem = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N'
            await driver.findElement(By.name('addpost-textarea')).sendKeys(lorem);
            await driver.findElement(By.css('.submit-post-button')).click();
            
            const postContent = await driver.findElement(By.css('.post-content')).getText();
            expect(postContent).toBe('This is a test post.');
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
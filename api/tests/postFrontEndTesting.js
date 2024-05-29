const { Builder, By, until } = require('selenium-webdriver');
// const driver = require('chromedriver');

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
});

afterAll(async () => {
  await driver.quit();
});

describe('Edit Post', () => {
  it('Should render landing page and display "Post Now."', async function () {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.tagName('p')), 10000);
    const title = await driver.findElement(By.tagName('p')).getText();
    expect(title).to.equal('Post Now.');
  });

  it('should click the Login button and open the login modal', async function () {
    await driver.get('http://localhost:3000');
    const signInButton = await driver.findElement(By.xpath("//button[contains(text(), 'Sign in')]"));
    await signInButton.click();

    await driver.wait(until.elementLocated(By.css('.login-modal')), 10000);

    const usernameInput = await driver.findElement(By.css,('input[value={credential}]'));
    await usernameInput.sendKeys('gybaez321@gmail.com')

    const passwordInput = await driver.findElement(By.css,('input[value={password}]'));
    await passwordInput.sendKeys('password');

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    await driver.wait(until.urlContains('/home'), 10000);

    const homeTitle = await driver.findElement(By.tagName('h1')).getText();
    expect(homeTitle).to.equal('Welcome to Home Page')
  });

  test('should navigate to profile page', async () => {
    await driver.get('http://localhost:3000');
    const profileLink = await driver.findElement(By.css('a[href="/profile"]'));
    await profileLink.click();
    await driver.wait(until.urlContains('/profile'), 10000);
    const profileTitle = await driver.findElement(By.tagName('h1')).getText();
    expect(profileTitle).toBe('Welcome to Profile Page'); // Adjust based on your profile page text
  });
});
const { Builder, By, until } = require('selenium-webdriver');
const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'postly',
});


const testConfig = "http://localhost:3000";

async function cleanTestData(email) {
    try {
        await db.query('DELETE FROM account WHERE email_address = ?', [email]);
    } catch (error) {
        throw error;
    }
}


async function registerAccount(driver) {
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
}

async function loginAccount(driver) { 
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
}

module.exports = {
    testConfig,
    cleanTestData,
    registerAccount,
    loginAccount,
}
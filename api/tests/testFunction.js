// testFunctions.js

require('dotenv').config();
const db = require('../controllers/a_db');

async function seedTestLoginData(testUserData) {
    try {
        await db.query('INSERT INTO account (account_handle, email_address, password) VALUES (?, ?, ?)', 
        [testUserData.handle, testUserData.email, testUserData.password]);

    } catch (error) {
        throw error;
    }
}

async function cleanupTestData(email) {
    try {
        await db.query('DELETE FROM account WHERE email_address = ?', [email]);
    } catch (error) {
        throw error;
    }
}


module.exports = { 
    seedTestLoginData, 
    cleanupTestData 
};
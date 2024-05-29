
const request = require('supertest');
const app = require('../routes');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/userController');
const db = require('../controllers/a_db'); 
const bcrypt = require('bcrypt');

jest.mock('../controllers/a_db');
jest.mock('bcrypt');

describe('User Controller', () => {

    let req, res;

    beforeEach(() => {
        req = { body: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        db.query.mockClear();
        bcrypt.hash.mockClear();
    });

    describe('updateUser', () => {
        it('should successfully update a user without a password', async () => {
            req.query = { userID: 1 };
            req.body = { username: 'new_username', email: 'new_email@example.com' };

            db.query.mockImplementation((sql, params, callback) => {
                callback(null, { affectedRows: 1 });
            });

            await userController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: "Successfully updated account",
                record: { affectedRows: 1 }
            });
        });

        it('should successfully update a user with a password', async () => {
            req.query = { userID: 1 };
            req.body = { username: 'new_username', password: 'new_password' };

            bcrypt.hash.mockResolvedValue('hashed_password');

            db.query.mockImplementation((sql, params, callback) => {
                callback(null, { affectedRows: 1 });
            });

            await userController.updateUser(req, res);

            expect(bcrypt.hash).toHaveBeenCalledWith('new_password', 10);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                message: "Successfully updated account",
                record: { affectedRows: 1 }
            });
        });

        it('should return an error if updating a user fails', async () => {
            req.query = { userID: 1 };
            req.body = { username: 'new_username' };

            db.query.mockImplementation((sql, params, callback) => {
                callback(new Error('Database error'), null);
            });

            await userController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                message: "Account udpate unsuccessful",
                error: 'Database error'
            });
        });
    });

    describe('retrieveByParams', () => {
        it('should successfully retrieve a user by params', async () => {
            req.query = { col: 'username', val: 'test_user' };

            db.query.mockImplementation((sql, params, callback) => {
                callback(null, [{ account_id: 1, username: 'test_user' }]);
            });

            await userController.retrieveByParams(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                user: [{ account_id: 1, username: 'test_user' }]
            });
        });

        it('should return an error if retrieving a user by params fails', async () => {
            req.query = { col: 'username', val: 'test_user' };

            db.query.mockImplementation((sql, params, callback) => {
                callback(new Error('Database error'), null);
            });

            await userController.retrieveByParams(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                error: 'Error retrieving records'
            });
        });
    });

    describe('retrieveByParamsLike', () => {
        it('should successfully retrieve users by params with LIKE', async () => {
            req.query = { col1: 'username', col2: 'email', value: 'test' };

            db.query.mockImplementation((sql, params, callback) => {
                callback(null, [
                    { account_id: 1, username: 'test_user', email: 'test_user@example.com' },
                    { account_id: 2, username: 'other_user', email: 'test_user2@example.com' }
                ]);
            });

            await userController.retrieveByParamsLike(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                user: [
                    { account_id: 1, username: 'test_user', email: 'test_user@example.com' },
                    { account_id: 2, username: 'other_user', email: 'test_user2@example.com' }
                ]
            });
        });

        it('should return an error if retrieving users by params with LIKE fails', async () => {
            req.query = { col1: 'username', col2: 'email', value: 'test' };

            db.query.mockImplementation((sql, params, callback) => {
                callback(new Error('Database error'), null);
            });

            await userController.retrieveByParamsLike(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                error: 'Error retrieving all records'
            });
        });
    });

    describe('retrieveAll', () => {
        it('should successfully retrieve all users', async () => {
            db.query.mockImplementation((sql, callback) => {
                callback(null, [
                    { account_id: 1, username: 'user1', email: 'user1@example.com' },
                    { account_id: 2, username: 'user2', email: 'user2@example.com' }
                ]);
            });

            await userController.retrieveAll(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 200,
                success: true,
                tasks: [
                    { account_id: 1, username: 'user1', email: 'user1@example.com' },
                    { account_id: 2, username: 'user2', email: 'user2@example.com' }
                ]
            });
        });

        it('should return an error if retrieving all users fails', async () => {
            db.query.mockImplementation((sql, callback) => {
                callback(new Error('Database error'), null);
            });

            await userController.retrieveAll(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 500,
                success: false,
                error: 'Error retrieving all records'
            });
        });
    });
});
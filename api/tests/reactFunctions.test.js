const request = require('supertest');
const app = require('../routes');
const db = require('../controllers/a_db'); 
const jwt = require('jsonwebtoken');

const { generateAccessToken, authenticateToken } = require('../middleware/jwtAuth');
const { refreshExistingToken } = require('../controllers/authController');
const {seedTestLoginData,cleanupTestData} = require('./testFunction');

const reactController = require('../controllers/reactController');

jest.mock('../controllers/a_db.js', () => {
  return {
      query: jest.fn()
  };
});

describe('API POST', () => {
    beforeEach(() => {
      req = { body: {}, query: {} };
      res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
      };
      db.query.mockClear();
  });
  
    describe('likePost', () => {
      it('should insert a like successfully', async () => {
        const req = {
          body: {
            postID: 1,
            reactID: 2,
          },
        };
        const res = {
          status: jest.fn(() => res),
          json: jest.fn(),
        };
        db.query.mockImplementation((sql, params, callback) => {
          callback(null, { affectedRows: 1 });
        });
  
        await reactController.likePost(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: 200,
          success: true,
          message: 'Successfully liked',
          record: { affectedRows: 1 },
        });
      });

      it('should handle database error', async () => {
        req.body = { postID: 1, reactID: 2 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        await reactController.likePost(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            success: false,
            message: "Like unsuccessful",
            error: 'Database error'
        });
      });
      
    });
  
    describe('RetrieveLikesByParams', () => {

      it('should successfully retrieve likes', async () => {
        req.query = { col: 'post_id', val: 1 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(null, [{ post_id: 1, reactor_id: 2 }]);
        });

        await reactController.retrieveLikesByParams(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            success: true,
            post: [{ post_id: 1, reactor_id: 2 }]
        });
      });
  
      it('should handle database errors', async () => {
        req.query = { col: 'post_id', val: 1 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        await reactController.retrieveLikesByParams(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            success: false,
            error: 'Error retrieving all records'
        });
      });
    });
  
    describe('countLikes', () => {
      it('should successfully count likes', async () => {
        req.query = { col: 'post_id', val: 1 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(null, [{ count: 10 }]);
        });

        await reactController.countLikes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            success: true,
            post: [{ count: 10 }]
        });
      });
  
      it('should handle database error', async () => {
        req.query = { col: 'post_id', val: 1 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        await reactController.countLikes(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            success: false,
            error: 'Error retrieving records'
        });
    });
    });
  
    describe('retrieveByTwoParams', () => {
      it('should successfully retrieve records by two params', async () => {
        req.query = { col1: 'post_id', val1: 1, col2: 'reactor_id', val2: 2 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(null, [{ post_id: 1, reactor_id: 2 }]);
        });

        await reactController.retrieveByTwoParams(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            success: true,
            records: [{ post_id: 1, reactor_id: 2 }]
        });
    });
  
      it('should handle database error', async () => {
        req.query = { col1: 'post_id', val1: 1, col2: 'reactor_id', val2: 2 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        await reactController.retrieveByTwoParams(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            success: false,
            error: 'Error retrieving records'
        });
      });
    });
  
    describe('softDeleteLike', () => {
      it('should successfully update a like', async () => {
        req.query = { reaction_id: 1 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        await reactController.updateLike(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            success: true,
            result: { affectedRows: 1 }
        });
      });
  
      it('should handle database error', async () => {
        req.query = { reaction_id: 1 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        await reactController.updateLike(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            success: false,
            error: 'Error deleting follow'
        });
      });
    });
  
    describe('updateLike', () => {
      it('should successfully update a like', async () => {
        req.query = { reaction_id: 1 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        await reactController.updateLike(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            success: true,
            result: { affectedRows: 1 }
        });
      });
  
      it('should return an error if updating a like fails with a database error', async () => {
        req.query = { reaction_id: 1 };

        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        await reactController.updateLike(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            success: false,
            error: 'Error deleting follow'
        });
      });
    });
  });
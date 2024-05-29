require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../routes');
const jwt = require('jsonwebtoken');

const { generateAccessToken, authenticateToken } = require('../middleware/jwtAuth');
const { refreshExistingToken } = require('../controllers/authController');
const {seedTestLoginData,cleanupTestData} = require('./testFunction');

const testUserData = {
    handle: 'katteu_cutie',
    email: 'princesskathmari2018to2024@gmail.com',
    password: '$2a$10$utj.n0a0YNcPYG.JMwk7BOKI0NnfOj7ccaRHxeKJu2ysADs0oOnli'
};

describe('LikePost', () => {
    beforeAll(async () => {
      await seedTestLoginData(testUserData);
    });
    
    afterAll(async () => {
      await cleanupTestData(testUserData.email);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('likePost', () => {
      test('should insert a like successfully', async () => {
        const res = await request(app)
              .post('/react/create')
              .send({ postID: '9', reactID: 1, });
              expect(res.statusCode).toBe(200);
              expect(res.body).toHaveProperty('message', 'Successfully liked');
      });

      //Not Done
      test('should handle database error', async () => {
        const res = await request(app)
              .post('/react/create')
              .send({ postID: 9, reactID: 1, });
              expect(res.status).toBe(500);
              expect(res.statusCode).toBe(500);
              expect(res.body).toHaveProperty('message', 'Like unsuccessful');
              expect(res.body).toHaveProperty('error', 'Database error');
            })
      
    });
  
    describe('RetrieveLikesByParams', () => {

      test('should retrieve likes by params successfully', async () => {
        const res = await request(app)
              .post('/react/retrieve')
              .send({ col: 'post_id', val: 1 });
              expect(res.statusCode).toBe(200);
              expect(res.body).toHaveProperty(rows);
      });
      // test('should retrieve likes by params successfully', async () => {
      //   const req = {
      //     query: {
      //       col: 'post_id',
      //       val: 1,
      //     },
      //   };
      //   const res = {
      //     status: jest.fn().mockReturnThis(),
      //     json: jest.fn(),
      //   };
  
      //   db.query.mockImplementation((sql, params, callback) => {
      //     callback(null, [{ post_id: 1, reactor_id: 2 }]);
      //   });
  
      //   await retrieveLikesByParams(req, res);
      //   expect(res.status).toHaveBeenCalledWith(200);
      //   expect(res.json).toHaveBeenCalledWith({
      //     status: 200,
      //     success: true,
      //     post: [{ post_id: 1, reactor_id: 2 }],
      //   });
      // });
  
      it('should handle database error', async () => {
        const req = {
          query: {
            col: 'post_id',
            val: 1,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(new Error('Database error'), null);
        });
  
        await retrieveLikesByParams(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          status: 500,
          success: false,
          error: 'Error retrieving all records',
        });
      });
    });
  
    describe('countLikes', () => {
      it('should count likes successfully', async () => {
        const req = {
          query: {
            col: 'post_id',
            val: 1,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(null, [{ count: 5 }]);
        });
  
        await countLikes(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: 200,
          success: true,
          post: [{ count: 5 }],
        });
      });
  
      it('should handle database error', async () => {
        const req = {
          query: {
            col: 'post_id',
            val: 1,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(new Error('Database error'), null);
        });
  
        await countLikes(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          status: 500,
          success: false,
          error: 'Error retrieving records',
        });
      });
    });
  
    describe('retrieveByTwoParams', () => {
      it('should retrieve records by two params successfully', async () => {
        const req = {
          query: {
            col1: 'post_id',
            val1: 1,
            col2: 'reactor_id',
            val2: 2,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(null, [{ post_id: 1, reactor_id: 2 }]);
        });
  
        await retrieveByTwoParams(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: 200,
          success: true,
          records: [{ post_id: 1, reactor_id: 2 }],
        });
      });
  
      it('should handle database error', async () => {
        const req = {
          query: {
            col1: 'post_id',
            val1: 1,
            col2: 'reactor_id',
            val2: 2,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(new Error('Database error'), null);
        });
  
        await retrieveByTwoParams(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          status: 500,
          success: false,
          error: 'Error retrieving records',
        });
      });
    });
  
    describe('softDeleteLike', () => {
      it('should soft delete a like successfully', async () => {
        const req = {
          query: {
            reaction_id: 1,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(null, { affectedRows: 1 });
        });
  
        await softDeleteLike(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: 200,
          success: true,
          result: { affectedRows: 1 },
        });
      });
  
      it('should handle database error', async () => {
        const req = {
          query: {
            reaction_id: 1,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(new Error('Database error'), null);
        });
  
        await softDeleteLike(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          status: 500,
          success: false,
          error: 'Error deleting like',
        });
      });
    });
  
    describe('updateLike', () => {
      it('should update a like successfully', async () => {
        const req = {
          query: {
            reaction_id: 1,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(null, { affectedRows: 1 });
        });
  
        await updateLike(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: 200,
          success: true,
          result: { affectedRows: 1 },
        });
      });
  
      it('should handle database error', async () => {
        const req = {
          query: {
            reaction_id: 1,
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, params, callback) => {
          callback(new Error('Database error'), null);
        });
  
        await updateLike(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          status: 500,
          success: false,
          error: 'Error deleting follow',
        });
      });
    });
  });
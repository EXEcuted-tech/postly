const request = require('supertest');
const app = require('../routes'); 
const db = require('../controllers/a_db'); 
const postController = require('../controllers/postController');

jest.mock('../controllers/a_db', () => ({
  query: jest.fn(),
}));

//=====================
//Testing Post Creation 
//=====================

describe('Post Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should create a new post', async () => {
    const mockRequest = {
      body: {
        account_id: 1,
        content: 'Test content',
      },
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    db.query.mockImplementation((query, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    await postController.createPost(mockRequest, mockResponse);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 200,
      success: true,
      post: { affectedRows: 1 },
    });
  });
  test('Should return 500 if database query fails', async () => {
    const mockRequest = {
      body: {
        account_id: 1,
        content: 'Test content',
      },
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    const mockError = new Error('Database error');
    db.query.mockImplementation((query, values, callback) => {
      callback(mockError);
    });
  
    await postController.createPost(mockRequest, mockResponse);
  
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 500,
      success: false,
      error: 'Error inserting data',
    });
  });
  
  test('Should return 400 if no rows affected by database query', async () => {
    const mockRequest = {
      body: {
        account_id: 1,
        content: 'Test content',
      },
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    db.query.mockImplementation((query, values, callback) => {
      callback(null, { affectedRows: 0 });
    });
  
    await postController.createPost(mockRequest, mockResponse);
  
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 400,
      success: false,
      error: 'Record insertion failed',
    });
  });
});

//=========================
//Testing Post Retrieve All
//=========================

describe('Post Controller - retrieveAll', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Should retrieve all posts successfully', async () => {
      const mockRequest = {};
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const mockPosts = [
        { post_id: 1, account_id: 1, content: 'Test content 1', created_at: '2023-01-01 00:00:00' },
        { post_id: 2, account_id: 2, content: 'Test content 2', created_at: '2023-01-02 00:00:00' },
      ];
      db.query.mockImplementation((query, callback) => {
        callback(null, mockPosts);
      });
  
      await postController.retrieveAll(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        success: true,
        post: mockPosts,
      });
    });
  
    test('Should return 500 if database query fails', async () => {
      const mockRequest = {};
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, callback) => {
        callback(mockError);
      });
  
      await postController.retrieveAll(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 500,
        success: false,
        error: 'Error retrieving all records',
      });
    });
  });

//===============================
//Testing Post Retrieve By Params
//===============================

describe('Post Controller - retrieveByParams', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Should retrieve posts by params successfully', async () => {
      const mockRequest = {
        query: {
          col: 'account_id',
          val: 1,
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const mockPosts = [
        { post_id: 1, account_id: 1, content: 'Test content 1', created_at: '2023-01-01 00:00:00' },
        { post_id: 2, account_id: 1, content: 'Test content 2', created_at: '2023-01-02 00:00:00' },
      ];
      db.query.mockImplementation((query, values, callback) => {
        callback(null, mockPosts);
      });
  
      await postController.retrieveByParams(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        success: true,
        post: mockPosts,
      });
    });
  
    test('Should return 500 if database query fails', async () => {
      const mockRequest = {
        query: {
          col: 'account_id',
          val: 1,
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, values, callback) => {
        callback(mockError);
      });
  
      await postController.retrieveByParams(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 500,
        success: false,
        error: 'Error retrieving all records',
      });
    });
  });

//=====================
//Testing Post Update
//=====================
  
  describe('Post Controller - updatePost', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Should update a post successfully', async () => {
      const mockRequest = {
        query: {
          postID: 1,
          val: 'Updated content',
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 1 });
      });
  
      await postController.updatePost(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        success: true,
        message: 'Successfully updated post',
        record: { affectedRows: 1 },
      });
    });
  
    test('Should return 500 if database query fails', async () => {
      const mockRequest = {
        query: {
          postID: 1,
          val: 'Updated content',
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, values, callback) => {
        callback(mockError);
      });
  
      await postController.updatePost(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 500,
        success: false,
        message: 'Post update unsuccessful',
        error: 'Database error',
      });
    });
  
    test('Should return 500 if an unexpected error occurs', async () => {
      const mockRequest = {
        query: {
          postID: 1,
          val: 'Updated content',
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
  
      try {
        await postController.updatePost(mockRequest, mockResponse);
      } catch (error) {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: 500,
          success: false,
          message: 'Database Error',
          error: 'Unexpected error',
        });
      }
    });
  
    test('Should return 400 if no rows affected by database query', async () => {
      const mockRequest = {
        query: {
          postID: 1,
          val: 'Updated content',
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 0 });
      });
  
      await postController.updatePost(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 400,
        success: false,
        message: 'Post update unsuccessful',
        error: 'Record update failed',
      });
    });
  });

//=====================
//Testing Post Update
//=====================

  describe('Post Controller - deletePost', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Should delete a post successfully', async () => {
      const mockRequest = {
        query: {
          col: 'post_id',
          val: 1,
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 1 });
      });
  
      await postController.deletePost(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        success: true,
        message: 'Post deleted successfully',
      });
    });
  
    test('Should return 500 if database query fails', async () => {
      const mockRequest = {
        query: {
          col: 'post_id',
          val: 1,
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, values, callback) => {
        callback(mockError);
      });
  
      await postController.deletePost(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 500,
        success: false,
        error: 'Error deleting record',
      });
    });
  
    test('Should return 404 if no post found to delete', async () => {
      const mockRequest = {
        query: {
          col: 'post_id',
          val: 1,
        },
      };
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 0 });
      });
  
      await postController.deletePost(mockRequest, mockResponse);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 404,
        success: false,
        error: 'Post not found',
      });
    });
  });
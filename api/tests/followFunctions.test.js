const request = require('supertest');
const app = require('../routes');
const bodyParser = require('body-parser');
const { createFollow, updateFollow, softDeleteFollow, retrieveByParams, retrieveCountByParams, retrieveCountMonthlyFollowers, retrieveCountGainedFollowers, retrieveCountLostFollowers, retrieveByTwoParams } = require('../controllers/followController');
const {createFollowValidator} = require('../validations/followValidator')
const db = require('../controllers/a_db');

jest.mock('../controllers/a_db', () => ({
  query: jest.fn(),
}));


app.use(bodyParser.json());
app.post('/create',createFollowValidator,createFollow);
app.post('/refollow',updateFollow);
app.get('/retrieve',retrieveByParams);
app.get('/retrieve/count',retrieveCountByParams);
app.get('/retrieve/count_lost',retrieveCountLostFollowers);
app.get('/retrieve/count_gained',retrieveCountGainedFollowers);
app.get('/retrieve/monthly_followers',retrieveCountMonthlyFollowers);
app.get('/retrieve_follow',retrieveByTwoParams);
app.post('/delete',softDeleteFollow);

describe('Follow API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //=====================
  //   CREATE FOLLOW 
  //=====================
  describe('Create a Follow', () => {
    test('Should create a new follow record', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 1 });
      });

      const response = await request(app)
        .post('/create')
        .send({ account_id: 1, follower_id: 2 });

      expect(response.body.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .post('/create')
        .send({ account_id: 1, follower_id: 2 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  //========================
  //  RETRIEVAL TEST CASES 
  //========================
  describe('Retrieve follow record by parameters', () => {
    test('Should retrieve records based on parameters', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [{ follow_id: 1, account_id: 1, follower_id: 2 }]);
      });

      const response = await request(app)
        .get('/retrieve')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.records.length).toBe(1);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .get('/retrieve')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Retrieve Follow Count By Params', () => {
    test('Should retrieve count based on parameters', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [{ count: 5 }]);
      });

      const response = await request(app)
        .get('/retrieve/count')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(5);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .get('/retrieve/count')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Retrieve Count of Monthly Followers', () => {
    test('Should retrieve monthly followers count', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [
          { month: '2024-04', count: 1 },
          { month: '2024-05', count: 2 },
        ]);
      });

      const response = await request(app)
        .get('/retrieve/monthly_followers')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.monthlyCounts.length).toBe(2);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .get('/retrieve/monthly_followers')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Retrieve the Count of Followers Gained', () => {
    test('Should retrieve count of gained followers within the last 30 days', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [{ count: 5 }]);
      });

      const response = await request(app)
        .get('/retrieve/count_gained')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(5);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .get('/retrieve/count_gained')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Retrieve the Count of Followers Lost', () => {
    test('Should retrieve count of lost followers within the last 30 days', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [{ count: 3 }]);
      });

      const response = await request(app)
        .get('/retrieve/count_lost')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(3);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .get('/retrieve/count_lost')
        .query({ col: 'account_id', val: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Retrieve if user has followed a particular user or not', () => {
    test('Should retrieve records based on two parameters', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [{ follow_id: 1, account_id: 1, follower_id: 2 }]);
      });

      const response = await request(app)
        .get('/retrieve_follow')
        .query({ col1: 'account_id', val1: 1, col2: 'follower_id', val2: 2 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.records.length).toBe(1);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .get('/retrieve_follow')
        .query({ col1: 'account_id', val1: 1, col2: 'follower_id', val2: 2 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  //========================
  //  RETRIEVAL TEST CASES 
  //========================
  describe('Update Follow', () => {
    test('Should update follow record', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 1 });
      });

      const response = await request(app)
        .post('/refollow')
        .query({ follow_id: 1 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .post('/refollow')
        .query({ follow_id: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    test('Should return error if updating record fails', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 0 });
      });

      const response = await request(app)
        .post('/refollow')
        .query({ follow_id: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Soft Delete Follow', () => {
    test('Should soft delete follow record', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 1 });
      });

      const response = await request(app)
        .post('/delete')
        .query({ follow_id: 1 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('Should handle errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('DB Error'));
      });

      const response = await request(app)
        .post('/delete')
        .query({ follow_id: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    test('Should return error if soft deleting record fails', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(null, { affectedRows: 0 });
      });

      const response = await request(app)
        .post('/delete')
        .query({ follow_id: 1 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });
});

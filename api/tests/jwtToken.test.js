require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../routes.js');
const jwt = require('jsonwebtoken');

const { generateAccessToken, authenticateToken } = require('../middleware/jwtAuth.js');
const db = require('../controllers/a_db.js');

jest.mock('../controllers/a_db.js', () => {
  return {
      query: jest.fn()
  };
});


app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed!', user: req.user });
});

//=====================
//   JWT TEST CASES 
//=====================
describe('Authenticate and Generate JWT Token', () => {
    test('Should generate a valid JWT token', () => {
        const user = { id: 1, name: 'John Doe' };
        const token = generateAccessToken(user);

        expect(token).toBeDefined();

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        expect(decoded).toMatchObject(user);
    });

    test('should return 401 if no token is provided', async () => {
        const response = await request(app).get('/protected');
        expect(response.status).toBe(401);
    });

    test('should return 403 if an invalid token is provided', async () => {
        const response = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Session has expired');
    });

    test('should allow access to protected route with a valid token', async () => {
        const user = { id: 1, name: 'John Doe' };
        const token = generateAccessToken(user);

        const response = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Protected route accessed!');
        expect(response.body.user).toMatchObject(user);
    });
});

describe('Refresh Token Function', () => {
  beforeEach(() => {
      jest.clearAllMocks();
  });

  test('Should return 401 if no refresh token is provided', async () => {
      const response = await request(app).post('/token').send({ token: null });

      expect(response.status).toBe(401);
  });

  test('Should return 403 if refresh token does not exist in the database', async () => {
      db.query.mockImplementation((sql, params, callback) => {
          callback(null, []); // Simulate no results
      });

      const response = await request(app).post('/token').send({ token: 'some-refresh-token' });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe('Refresh token does not exist');
  });

  test('Should return 403 if refresh token is invalid', async () => {
      db.query.mockImplementation((sql, params, callback) => {
          callback(null, [{ account_id: 1, account_handle: 'test_handle', name: 'Test Name', email_address: 'test@example.com', dp_id: 1 }]);
      });

      jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
          callback(new Error('invalid token'), null);
      });

      const response = await request(app).post('/token').send({ token: 'invalid-refresh-token' });

      expect(response.status).toBe(403);
  });

  test('Should return a new access token if refresh token is valid', async () => {
      db.query.mockImplementation((sql, params, callback) => {
          callback(null, [{ account_id: 1, account_handle: 'test_handle', name: 'Test Name', email_address: 'test@example.com', dp_id: 1 }]);
      });

      jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
          callback(null, { userID: 1 });
      });

      const newAccessToken = 'new-access-token';
      jest.spyOn(jwt, 'sign').mockReturnValue(newAccessToken);

      const response = await request(app).post('/token').send({ token: 'valid-refresh-token' });

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBe(newAccessToken);
  });
});
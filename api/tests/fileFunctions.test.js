require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const fs = require('fs');
const app = require('../routes');
const { uploadFile, fetchFile, retrieveByParams } = require('../controllers/fileController');
const db = require('../controllers/a_db');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

jest.mock('../controllers/a_db');
jest.mock('fs');
jest.mock('multer', () => {
  return () => ({
    single: () => (req, res, next) => {
      req.file = { filename: 'testfile.txt', path: 'uploads/testfile.txt' };
      next();
    },
  });
});

app.post('/file/upload', upload.single('file'), uploadFile);
app.get('/file/retrieve', retrieveByParams);
app.get('/file/fetch', fetchFile);

describe('File Functions and API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Upload a file or image', () => {
    test('should upload a file and insert into the database', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, { insertId: 1 });
      });

      const response = await request(app)
        .post('/file/upload')
        .attach('file', 'test/testfile.txt');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'File uploaded successfully',
        data: { insertId: 1 },
      });
    });

    test('Should return 500 if there is a database error', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        callback(new Error('Database error'));
      });

      const response = await request(app)
        .post('/file/upload')
        .attach('file', 'test/testfile.txt');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error uploading file' });
    });
  });

  describe('fetchFile', () => {
    test('Should fetch a file', async () => {
      fs.existsSync.mockReturnValue(true);
      fs.createReadStream.mockReturnValue({
        pipe: jest.fn().mockImplementation((res) => res.end()),
      });

      const response = await request(app)
        .get('/file/fetch')
        .query({ pathfile: 'uploads/testfile.txt' });

      expect(response.status).toBe(200);
    });

    test('Should return 404 if the file does not exist', async () => {
      fs.existsSync.mockReturnValue(false);

      const response = await request(app)
        .get('/file/fetch')
        .query({ pathfile: 'uploads/nonexistentfile.txt' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'File not found' });
    });
  });

  describe('retrieveByParams', () => {
    test('Should retrieve a file by parameters', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, [{ filename: 'testfile.txt', path: 'uploads/testfile.txt' }]);
      });

      const response = await request(app)
        .get('/file/retrieve')
        .query({ col: 'filename', val: 'testfile.txt' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 200,
        success: true,
        filedata: { filename: 'testfile.txt', path: 'uploads/testfile.txt' },
      });
    });

    test('Should return 500 if there is a database error', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        callback(new Error('Database error'));
      });

      const response = await request(app)
        .get('/file/retrieve')
        .query({ col: 'filename', val: 'testfile.txt' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error retrieving data' });
    });
  });
});

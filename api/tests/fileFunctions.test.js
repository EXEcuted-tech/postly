const {uploadFile,fetchFile,retrieveByParams} = require('../controllers/fileController');
  
  const db = require('../controllers/a_db');
  const fs = require('fs');
  
  jest.mock('../controllers/a_db', () => ({
    query: jest.fn(),
  }));
  
  jest.mock('fs', () => ({
    existsSync: jest.fn(),
    createReadStream: jest.fn(),
  }));
  
  describe('File Controller Functions', () => {

    //==========================
    //  UPLOAD FILE TEST CASES 
    //==========================
    describe('Upload File', () => {
      test('Should upload a file and insert into the database', () => {
        const req = {
          file: {
            filename: 'testfile.txt',
            path: '/path/to/testfile.txt',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, values, callback) => {
          callback(null, { insertId: 1 });
        });
  
        uploadFile(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: 'File uploaded successfully',
          data: { insertId: 1 },
        });
      });
  
      test('Should return 500 if there is an error uploading the file', () => {
        const req = {
          file: {
            filename: 'testfile.txt',
            path: '/path/to/testfile.txt',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        jest.spyOn(console, 'error').mockImplementation(() => {});

        db.query.mockImplementation((sql, values, callback) => {
          callback(new Error('Database error'));
        });
  
        uploadFile(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error uploading file' });
      });
    });
  
    //==========================
    //  FETCH FILE TEST CASES 
    //==========================
    describe('Fetch File', () => {
        test('Should fetch a file if it exists', () => {
            const req = {
              query: { pathfile: '/path/to/testfile.txt' },
            };
            const res = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
        
            fs.existsSync.mockReturnValue(true);
        
            const mockReadStream = { pipe: jest.fn() };
            fs.createReadStream.mockReturnValue(mockReadStream);
        
            fetchFile(req, res);
        
            expect(fs.existsSync).toHaveBeenCalledWith('/path/to/testfile.txt');
            expect(fs.createReadStream).toHaveBeenCalledWith('/path/to/testfile.txt');
            expect(mockReadStream.pipe).toHaveBeenCalledWith(res);
          });
  
      test('Should return 404 if the file does not exist', () => {
        const req = {
          query: { pathfile: '/path/to/nonexistentfile.txt' },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        fs.existsSync.mockReturnValue(false);
        fetchFile(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'File not found' });
      });
    });

    //==========================
    // RETRIEVE FILE TEST CASES 
    //==========================
    describe('Retrieve File from Database', () => {
      test('Should retrieve a file by parameters', () => {
        const req = {
          query: { col: 'filename', val: 'testfile.txt' },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, values, callback) => {
          callback(null, [{ filename: 'testfile.txt', path: '/path/to/testfile.txt' }]);
        });
  
        retrieveByParams(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          status: 200,
          success: true,
          filedata: { filename: 'testfile.txt', path: '/path/to/testfile.txt' },
        });
      });
  
      test('Should return 500 if there is an error retrieving the data', () => {
        const req = {
          query: { col: 'filename', val: 'testfile.txt' },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        db.query.mockImplementation((sql, values, callback) => {
          callback(new Error('Database error'));
        });
  
        retrieveByParams(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error retrieving data' });
      });
    });
  });
  
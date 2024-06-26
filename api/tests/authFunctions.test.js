require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../routes');

const {seedTestLoginData,cleanupTestData} = require('./testFunction')

const testUserData = {
  handle: 'katteu_cutie',
  email: 'princesskathmari2018to2024@gmail.com',
  password: '$2a$10$utj.n0a0YNcPYG.JMwk7BOKI0NnfOj7ccaRHxeKJu2ysADs0oOnli'
};

//=====================
//   LOGIN TEST CASES 
//=====================
describe('Login API Endpoint',()=>{
  beforeAll(async () => {
    await seedTestLoginData(testUserData);
  });
  
  afterAll(async () => {
    await cleanupTestData(testUserData.email);
  });

    describe('POST /login', () => {
        test('Should login successfully when password is correct', async () => {
            const res = await request(app)
              .post('/login')
              .send({ credential: 'katteu_cutie', password: 'password' });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'Logged in successfully!');
            expect(res.body).toHaveProperty('accessToken');
            expect(res.body).toHaveProperty('refreshToken');
          });

          test('Throw error if no username or email inputted', async () => {
            const res = await request(app)
              .post('/login')
              .send({ credential: '', password: 'password' });
            expect(res.body).toHaveProperty('status',404);
            expect(res.body).toHaveProperty('error', 'Username or email is required!');
          });

          test('Throw error if no password inputted', async () => {
            const res = await request(app)
              .post('/login')
              .send({ credential: 'katteu_cutie', password: '' });
              expect(res.body).toHaveProperty('status',404);
            expect(res.body).toHaveProperty('error', 'Password is required!');
          });

          test('Throw error if password is incorrect', async () => {
            const res = await request(app)
              .post('/login')
              .send({ credential: 'princesskathmari2018to2024@gmail.com', password: 'test' });
            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error', 'Invalid Credentials!');
          });

          test('Throw error if account does not exist', async () => {
            const res = await request(app)
              .post('/login')
              .send({ credential: 'no_account', password: 'testing' });
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error', 'Account does not exist!');
          });
    });    
})

//=====================
//  SIGNUP TEST CASES 
//=====================
describe('Sign Up API Endpoint',()=>{
  const testEmail='testingiko@exampleabc.com';

  afterAll(async () => {
    await cleanupTestData(testEmail);
  });

    describe('POST /signup', () => {
        test('Should register successfully when credentials are inputted correctly', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: 'USCTester',
                email_address: testEmail, 
                password: 'password' 
              });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'Account successfully created');
          });

          test('Throw error if no username is inputted', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: '',
                email_address: testEmail, 
                password: 'password' 
              });
            expect(res.body).toHaveProperty('status',404);
            expect(res.body).toHaveProperty('error', 'Username is required!');
          });

          test('Throw error if username is less than 4 characters', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: 'USC',
                email_address: testEmail, 
                password: 'password' 
              });
            expect(res.body).toHaveProperty('status',404);
            expect(res.body).toHaveProperty('error', 'Username must be 4-15 characters long.');
          });

          test('Throw error if username is more than 15 characters', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: 'USCTestersUNITEDKNGDOM',
                email_address: testEmail, 
                password: 'password' 
              });
            expect(res.body).toHaveProperty('status',404);
            expect(res.body).toHaveProperty('error', 'Username must be 4-15 characters long.');
          });

          test('Throw error if no email is inputted', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: 'USCTestersz',
                email_address: '', 
                password: 'password' 
              });
            expect(res.body).toHaveProperty('status',404);
            expect(res.body).toHaveProperty('error', 'Email is required!');
          });

          
          test('Throw error if email already exists', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: 'USCTesters',
                email_address: testEmail, 
                password: 'password'
              });
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'Email address or account handle already exists!');
          });

          test('Throw error if account handle already exists', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: 'USCTester',
                email_address: 'test@abc.com', 
                password: 'password'
              });
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'Email address or account handle already exists!');
          });

          test('Throw error if no password inputted', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: 'USCTesterisms',
                email_address: testEmail, 
                password: ''
              });
            expect(res.body).toHaveProperty('status',404);
            expect(res.body).toHaveProperty('error', 'Password is required!');
          });

          test('Throw error if password is less than 8 characters', async () => {
            const res = await request(app)
              .post('/signup')
              .send({ 
                account_handle: 'USCSS',
                email_address: testEmail, 
                password: 'passwor' 
              });
            expect(res.body).toHaveProperty('status',404);
            expect(res.body).toHaveProperty('error', 'Password must be at least 8 characters long.');
          });
    });    
})

require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../routes');
const jwt = require('jsonwebtoken');
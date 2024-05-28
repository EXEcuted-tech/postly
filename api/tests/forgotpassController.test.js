const request = require('supertest');
const app = require('../routes'); 
const forgotpassController = require('../controllers/forgotpassController');
const nodemailer = require('nodemailer')

jest.mock('nodemailer')

//=====================
//Testing Email Sending
//=====================

describe('Send Email', () => {

    let mockRequest;
    let mockResponse;
    let sendMailMock;
    let otpData;


  beforEach(() => {
    sendMailMock = jest.fn().mockResolvedValueOnce({})
    nodemailer.createTransport.mockReturnValue({
        sendMail: sendMailMock
    })
  });

  mockRequest = {
    body: {
        email: 'test@example.com'
    }
  }
  mockResponse = {
    status: jest.fn(()=>mockResponse),
    json: jest.fn
  }

  optData = {};
  forgotpassController.__set__('optData'. optData)\

  afterEach(() =>{
    jest.clearAllMocks()
  })

  test('Should send an email with OTP and Store OTP data', async () =>{
    await forgotpassController.sendEmail(mockRequest, mockResponse)

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1)
    expect(sendMailMock).toHaveBeenCalledWith(expect.objectContaining({
        from: 'reservoph@gmail.com',
        to: 'test@example.com',
        subject: 'Password Reset Request',
        html: expect.stringContaining('<h2>')
    }))
  })
});


//=========================
//Testing OTP Verification
//=========================


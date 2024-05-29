const nodemailer = require('nodemailer');
const { sendEmail, validateOTP } = require('../controllers/forgotpassController');

jest.mock('nodemailer');

//==================
//Testing Send Email
//==================

describe('Send Email', () => {
  let mockRequest;
  let mockResponse;
  let sendMailMock;

  beforeEach(() => {
    jest.resetAllMocks();
    sendMailMock = jest.fn().mockResolvedValueOnce({});
    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });
    

    mockRequest = {
      body: {
        email: 'test@example.com',
      },
    };
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
  });

  test('Should send an email with OTP and return success message', async () => {
    await sendEmail(mockRequest, mockResponse);

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email sent successfully' });
  });

  test('Should return an error message if sending email fails', async () => {
    sendMailMock = jest.fn(() => Promise.reject(new Error('Failed to send email')));
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
    await sendEmail(mockRequest, mockResponse)

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error sending email' });
  });

  let req, res;
  
  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

});

//====================
//Testing Validate OTP
//====================

describe('validateOTP function', () => {
    // Mocking req and res objects
    let req, res;
  
    beforeEach(() => {
      req = { body: {} };
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
    });
  
    test('Should return "Invalid or expired OTP" when OTP is incorrect', () => {
      const email = 'test@example.com';
      const userOTP = '654321'; 

      const otpData = {
        [email]: {
          otp: '123456', 
          timestamp: Date.now(),
        },
      };
  
      req.body.email = email;
      req.body.userOTP = userOTP;
  
      validateOTP(req, res);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired OTP', success: false });
    });
  
    test('Should return "OTP not found" when no OTP data exists for the given email', () => {
      const email = 'nonexistent@example.com';
  
      req.body.email = email;
      req.body.userOTP = '123456';
  
      validateOTP(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'OTP not found', success: false });
    });
  });
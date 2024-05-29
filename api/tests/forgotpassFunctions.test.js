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

  it('should return "OTP is valid" when OTP is correct and within time limit', () => {
    const email = 'test@example.com';
    const userOTP = '123456';
    const timestamp = Date.now();
  
    const otpData = {
      [email]: {
        otp: userOTP,
        timestamp: timestamp,
      },
    };
    req.body.email = email;
    req.body.userOTP = userOTP;

    console.log(`Time started: ${otpData['test@example.com'].timestamp}`)
    console.log(`Time started: ${timestamp}`)
    console.log(`Correct: ${otpData['test@example.com'].otp === userOTP && otpData['test@example.com'].timestamp - timestamp <= 5 * 60 * 1000}`)

    console.log(`Request: ${req.body.email}`)
  
    validateOTP(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status(200).json).toHaveBeenCalledWith({ message: 'OTP is valid', success: true });
  });

  it('Should return "Invalid or expired OTP" when OTP is incorrect', () => {
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

  it('Should return "OTP not found" when no OTP data exists for the given email', () => {
    const email = 'nonexistent@example.com';

    req.body.email = email;
    req.body.userOTP = '123456';

    validateOTP(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'OTP not found', success: false });
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
  
    it('should return "OTP is valid" when OTP is correct and within time limit', () => {
      const email = 'test@example.com';
      const userOTP = '123456';
      const timestamp = Date.now();
    
      const otpData = {
        [email]: {
          otp: userOTP,
          timestamp: timestamp,
        },
      };
      req.body.email = email;
      req.body.userOTP = userOTP;

      console.log(`Time started: ${otpData['test@example.com'].timestamp}`)
      console.log(`Time started: ${timestamp}`)
      console.log(`Correct: ${otpData['test@example.com'].otp === userOTP && otpData['test@example.com'].timestamp - timestamp <= 5 * 60 * 1000}`)

      console.log(`Request: ${req.body.email}`)
    
      validateOTP(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status(200).json).toHaveBeenCalledWith({ message: 'OTP is valid', success: true });
    });
  
    it('Should return "Invalid or expired OTP" when OTP is incorrect', () => {
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
  
    it('Should return "OTP not found" when no OTP data exists for the given email', () => {
      const email = 'nonexistent@example.com';
  
      req.body.email = email;
      req.body.userOTP = '123456';
  
      validateOTP(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'OTP not found', success: false });
    });
  });
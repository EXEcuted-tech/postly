const nodemailer = require('nodemailer');
const { sendEmail, validateOTP } = require('../controllers/forgotpassController');

jest.mock('nodemailer');

describe('sendEmail', () => {
  let mockRequest;
  let mockResponse;
  let sendMailMock;

  beforeEach(() => {
    // Reset mocks before each test
    sendMailMock = jest.fn().mockResolvedValueOnce({});
    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });

    // Mock request and response
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

  test('should return an error message if sending email fails', async () => {
    await sendEmail(mockRequest, mockResponse);

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error sending email' });
  });
});

describe('validateOTP', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Mock request and response
    mockRequest = {
      body: {
        email: 'test@example.com',
        userOTP: '123456', // Example OTP for testing
      },
    };
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
  });

  test('should return success message if OTP is valid', () => {
    // Mock otpData with valid OTP for the email
    validateOTP.otpData['test@example.com'] = { otp: '123456', timestamp: Date.now() };

    validateOTP(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'OTP is valid', success: true });
  });

  test('should return error message if OTP is invalid or expired', () => {
    // Mock otpData with expired OTP for the email
    validateOTP.otpData['test@example.com'] = { otp: '123456', timestamp: Date.now() - 6 * 60 * 1000 };

    validateOTP(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid or expired OTP', success: false });
  });

  test('should return error message if OTP not found', () => {
    // Mock otpData without OTP for the email
    validateOTP.otpData = {};

    validateOTP(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'OTP not found', success: false });
  });
});
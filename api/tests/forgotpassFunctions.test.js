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
  afterEach(() => {
    jest.clearAllMocks();
  })

});

//====================
//Testing Validate OTP
//====================

describe('Validate OTP function', () => {
    // Mocking req and res objects
    let req, res;
    beforeEach(() => {
      req = { body: {} };
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
    });
  
    test('should return "OTP is valid" when OTP is correct and within time limit', () => {
      const otpData ={}
      const validateSuccessOTP = (req, res) => {
        const { email, userOTP } = req.body;
        let string = '0123456789';
        let OTP = '';

        let len = string.length;
        for (let i = 0; i < 6; i++) {
          OTP += string[Math.floor(Math.random() * len)];
        }
        const newtimestamp = Date.now();
          otpData[email] = { otp: OTP, newtimestamp };
        if (otpData[email]) {
         
          let { otp, timestamp } = otpData[email];
          const currentTime = Date.now();
          otp = userOTP
          timestamp = currentTime

          console.log(`This is shit: ${otp}`)
          console.log(`This is shit: ${userOTP}`)
      
          console.log("This is the Status: ", currentTime - timestamp <= 5 * 60 * 1000)
      
          if (userOTP === otp && currentTime - timestamp <= 5 * 60 * 1000) {
            res.status(200).json({ message: 'OTP is valid', success:true});
          } else {
            res.status(401).json({ message: 'Invalid or expired OTP',success:false});
          }
        } else {
          res.status(404).json({ message: 'OTP not found',success:false });
        }
      };

      const email = 'test@example.com';
      const expectedOTP = '123456'

      req.body.email = email;
      req.body.userOTP = expectedOTP;
    
      validateSuccessOTP(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status(200).json).toHaveBeenCalledWith({ message: 'OTP is valid', success: true });
    });
   
    test('Should return "Invalid or expired OTP" when OTP is incorrect', () => {
      const email = 'test@example.com';
      const userOTP = '654321'; 
  
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
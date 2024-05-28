require('dotenv').config()

const db = require('./a_db');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateAccessToken } = require('../middleware/jwtAuth');

const login = (req,res) =>{
    try{
        const {credential,password} = req.body;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailPattern.test(credential);
        const col = isEmail ? 'email_address' : 'account_handle'

        const sqlQuery = `SELECT * FROM account where ${col} = ?`
        db.query(sqlQuery,[credential],(err,result)=>{
            if(!err && result.length === 1 ){
              const hash = result[0].password;
              bcrypt.compare(password,hash).then(function(response){
                if(response === true){
                    const user = {
                        userID: result[0].account_id,
                        userHandle: result[0].account_handle,
                        name: result[0].name,
                        email: result[0].email_address,
                        dp: result[0].dp_id,
                    }

                    const accessToken = generateAccessToken(user);
                    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
                    const sql = `UPDATE account SET refresh_token = ? WHERE account_id = ?`

                    db.query(sql,[refreshToken,result[0].account_id],(error) => {
                        if (error) {
                            return res.status(500).json({status: 500,success: false,error: 'Refresh Token Error'});
                        }
                    })

                    res.status(201).json({
                        status: 201,
                        success: true,
                        message: "Logged in successfully!",
                        accessToken: accessToken, 
                        refreshToken: refreshToken
                    });
                }else{
                    res.status(401).json({
                        status: 401,
                        success: false,
                        error: "Invalid Credentials!",
                    });
                }
              })
            }else{
                res.status(404).json({
                    status: 404,
                    success: false,
                    error: "Account does not exist!",
                }); 
            }
        })
    }catch{
        
    }
}

const logout = (req,res) =>{
    const { token } = req.body;

    if (!token) return res.sendStatus(401);

    const sql = `UPDATE account SET refresh_token = NULL WHERE refresh_token = ?`;

    db.query(sql, [token], (err, result) => {
        if (err) {
            return res.status(500).json({status: 500, success: false, error: "Internal Server Error"});
        }

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Logout successful! Refresh token removed.",
            });
        } else {
            res.status(404).json({
                status: 404,
                success: false,
                error: "Refresh token not found.",
            });
        }
    });
}

const refreshExistingToken = (req,res) =>{
    const refreshToken = req.body.token
    //console.log(refreshToken)
    if(refreshToken === null) return res.sendStatus(401)
    
    const sql = `SELECT * FROM account WHERE refresh_token = ?`;

    db.query(sql, [refreshToken], (err, result) => {
        if (err) {
            return res.status(500).json({status: 500, success: false, error: "Internal Server Error"});
        }

        //console.log("Result: ",);
        if (result.length > 0) {
            // Refresh token exists
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error,user)=>{
                if (error) return res.sendStatus(403)
                const new_user = {
                    userID: result[0].account_id,
                    userHandle: result[0].account_handle,
                    name: result[0].name,
                    email: result[0].email_address,
                    dp: result[0].dp_id,
                }
                const accessToken = generateAccessToken(new_user);
                res.json({accessToken:accessToken});
            })  
        } else {
            // Refresh token does not exist
            res.status(403).json({status: 403, success: false, error: "Refresh token does not exist"});
        }
    });
}

const signup = (req,res) =>{
    const { account_handle, email_address, password } = req.body;

    db.query('SELECT email_address from account WHERE email_address = ?', [email_address], async (error, results) =>{
        if(error){
            //console.log(error);
        }

        if(results.length > 0){
            res.status(404).json({
                status: 404,
                success: false,
                message: "Email address already exists!",
            });
            return;
        }

        let hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = "INSERT INTO account (account_handle, name, email_address, password) VALUES (?, ?, ?, ?)";
        const values = [account_handle, account_handle, email_address, hashedPassword];

        if(account_handle && email_address && hashedPassword){
            db.query(sql, values, (error, results) =>{
                if(error){
                    console.log(error);
                } else{
                    //console.log(results);
                    res.status(201).json({
                    status: 201,
                    success: true,
                    message: "Account successfully created",
                    });
                }
            })
        }
        
    });
}

const otpData = {};

const sendEmail = async (req, res) => {
  const { email } = req.body;

  // Create a Nodemailer transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail' or your SMTP settings
    auth: {
      user: 'reservoph@gmail.com',
      pass: 'sfrs ieto hthg hmxb',
    },
  });

  //Generate OTP Code
  let string = '0123456789';
  let OTP = '';

  let len = string.length;
  for (let i = 0; i < 6; i++) {
      OTP += string[Math.floor(Math.random() * len)];
  }

  // Store OTP and creation timestamp
  const timestamp = Date.now(); // Current timestamp
  otpData[email] = { otp: OTP, timestamp };

  // Create the email message
  const mailOptions = {
    from: 'reservoph@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Your verification code is:</p><h2>${OTP}</h2><p>This code will expire in 5 minutes!</p><p>If you did not initiate this, you can safely ignore this message.</p>`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
}

const validateOTP = (req, res) => {
  const { email, userOTP } = req.body;

  if (otpData[email]) {
    const { otp, timestamp } = otpData[email];
    const currentTime = Date.now();

    // Check if the OTP is correct and within the time limit (e.g., 5 minutes)
    if (userOTP === otp && currentTime - timestamp <= 5 * 60 * 1000) {
      res.status(200).json({ message: 'OTP is valid', success:true});
    } else {
      res.status(200).json({ message: 'Invalid or expired OTP',success:false});
    }
  } else {
    res.status(200).json({ message: 'OTP not found',success:false });
  }
};


module.exports = {
    login,
    logout,
    refreshExistingToken,
    signup
}
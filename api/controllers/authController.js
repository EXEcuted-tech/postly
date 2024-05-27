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
                        error: "Invalid credentials",
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

const signup = async (req,res) =>{
    try {
        const { name, email_address, password } = req.body;

        const sql = "INSERT INTO account (name, email_address, password) VALUES (?, ?, ?)";
        const hashedpassword = await bcrypt.hash(password, saltRounds)
        const values = [name, email_address, password];

        db.query(sql, values, (err, result) => {
            if (err) {
                res.status(404).json({
                    success: false,
                    message: "Account add fail",
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Account created successfully",
                    data: result,
                });
            }

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Error",
            error: error.message
        });
    }
    
    
    // console.log(req.body);

    // const { username, email, password} = req.body;

    // db.query('SELECT email_address FROM account WHERE email_address = ?', [email], async (error, results) => {
    //     if(error){
    //         console.log(error);
    //     }
    //     if(results.length > 0){
    //         return res.render('/signup', {
    //             message: 'That email is already in use'
    //         })
    //     } else if(password !== retypePassword){
    //         return res.render('/signup', {
    //             message: 'The password do not match'
    //         })
    //     };

    //     let hashedPassword = await bcrypt.hash(password, 8);
    //     console.log(hashedPassword)
    // })
}

module.exports = {
    login,
    logout,
    refreshExistingToken,
    signup,
}
require('dotenv').config()
const jwt = require('jsonwebtoken');

const authenticateToken = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if (err) {
            return res.status(403).json({ message: 'Session has expired' });
        }
        
        req.user = user
        next();
    })
}

const generateAccessToken = (user) =>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
}

module.exports = {
    authenticateToken,
    generateAccessToken
}
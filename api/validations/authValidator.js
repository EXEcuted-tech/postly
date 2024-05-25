const authenticationValidator = (req,res,next)=>{

    next();
}

const loginValidator = (req, res, next) => {
    let error = "";
    
    if (!req.body.credential) {
        error = 'Username or email is required'
    }

    if (!req.body.password) {
        error = 'Password is required'
    }

    if (error !== '') {
        return res.json({
            status: 404,
            success: false,
            error: error,
        });
    }
    next();
}

module.exports = {loginValidator}
   

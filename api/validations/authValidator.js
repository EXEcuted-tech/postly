const loginValidator = (req, res, next) => {
    let error = "";
    
    if (!req.body.credential) {
        error = 'Username or email is required!'
    }

    if (!req.body.password) {
        error = 'Password is required!'
    }

    if (error !== '') {
        return res.status(404).json({
            status: 404,
            success: false,
            error: error,
        });
    }
    next();
}

const signupValidator = (req, res, next) => {
    let error = "";

    if (!req.body.account_handle) {
        error = 'Username is required!'
    }else if(req.body.account_handle.length <= 4 || req.body.account_handle.length >= 15){
        error = "Username must be 4-15 characters long."
    }

    if (!req.body.email_address) {
        error = 'Email is required!'
    }

    if (!req.body.password) {
        error = 'Password is required!'
    } else if (req.body.password.length < 8) {
        error = 'Password must be at least 8 characters long.';
    }

    if (error !== '') {
        return res.status(404).json({
            status: 404,
            success: false,
            error: error,
        });
    }
    next();
}

module.exports = {loginValidator, signupValidator}

   

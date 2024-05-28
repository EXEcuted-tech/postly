const editUserValidator = (req, res, next) => {
    const { userID } = req.query;
    const { name, password} = req.body;

    let error = "";

    if (!userID || isNaN(userID)) {
        error = 'User ID is required and must be a number!';
    }

    if (name !== undefined && (typeof name !== 'string' || name.length < 1)) {
        error = 'Name must be inputted!';
    }

    if (password !== undefined && (typeof password !== 'string' || password.length < 8)) {
        error = 'Password must be a string with at least 8 characters long!';
    }

    if (error) {
        return res.json({
            status: 404,
            success: false,
            error: error,
        });
    }

    next();
};


module.exports = {editUserValidator};
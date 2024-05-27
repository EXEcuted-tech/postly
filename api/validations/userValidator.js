const editUserValidator = (req, res, next) => {
    const { userID } = req.query;
    const { name } = req.body;

    let error = "";

    if (!userID || isNaN(userID)) {
        error = 'User ID is required and must be a number!';
    }

    if (name !== undefined && (typeof name !== 'string' || name.length < 1)) {
        error = 'Name must be a non-empty string if provided!';
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
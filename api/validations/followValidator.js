const createFollowValidator = (req,res,next)=>{
    const { account_id, follower_id } = req.body;

    const errors = {};

    if (!account_id || typeof account_id !== 'number') {
        errors.account_id = 'User cannot be followed!';
    }

    if (!follower_id || typeof follower_id !== 'number') {
        errors.follower_id = 'User following cannot be identified!';
    }

    if (Object.keys(errors).length > 0) {
        return res.json({
            status: 404,
            success: false,
            error: errors,
        });
    }

    next();
}


module.exports = {createFollowValidator};
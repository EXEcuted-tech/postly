const createPostValidator = (req,res,next)=>{
    const { account_id,content } = req.body;

    const errors = {};

    if (!account_id || typeof account_id !== 'number') {
        errors.account_id = 'User cannot be identified!';
    }

    if (!content || typeof content !== 'string') {
        errors.content = 'Content is required and it must be a string!';
    }else if (content.length > 1000) {
        errors.content = 'Content must be equal to or less than 1000 characters!';
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


module.exports = {createPostValidator};
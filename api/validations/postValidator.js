const createPostValidator = (req,res,next)=>{
    const { account_id,content } = req.body;

    let error = "";

    if (!account_id || typeof account_id !== 'number') {
        error = 'User cannot be identified!';
    }

    if (!content || typeof content !== 'string') {
        error = 'Content is required and it must be a string!';
    }else if (content.length > 1000) {
        error = 'Content must be equal to or less than 1000 characters!';
    }

    if (error) {
        return res.json({
            status: 404,
            success: false,
            error: error,
        });
    }

    next();
}

const editValidator = (req, res, next) => {
    const { postID, val } = req.query;

    let error = "";

    if (!postID || isNaN(postID)) {
        error = 'Post ID cannot be identified!';
    }

    if (!val || val=='' || typeof val !== 'string') {
        error = 'Content is required and it must be a string!';
    } else if (val.length > 1000) {
        error = 'Content must be 1000 characters or less!';
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


module.exports = {createPostValidator,editValidator};
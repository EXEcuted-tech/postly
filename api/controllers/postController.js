const db = require('./a_db'); 

const createPost = (req,res) =>{
    const {account_id,content} = req.body;
    const insertQuery = 'INSERT into post (account_id,content) VALUES (?,?)';
    
    try{
       db.query(insertQuery,[account_id,content],(err,result)=>{
        if (err) {
            return res.status(500).json({ status: 500, success:false,error: 'Error inserting data' });
          }
      
          if (result.affectedRows > 0) {
            return res.status(200).json({
              status: 200,
              success: true,
              post: result,
            });
          } else {
            return res.status(400).json({ status: 400, success: false, error: 'Record insertion failed' });
          }
       })
    }catch{
        return res.status(500).json({ status: 500, success: false, error: 'An error occurred' });
    }
}

const retrieveAll = (req,res) => {
    const postRecs = 'SELECT * FROM post ORDER BY created_at DESC'

    db.query(postRecs, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
      }else{
        return res.status(200).json({
          status: 200,
          success: true,
          post: rows,
        });
      }
    });
}

const retrieveByParams = (req, res) => {
    const {col, val} = req.query

    const  getPosts = `SELECT * FROM post WHERE ?? = ? ORDER BY created_at DESC`

    db.query(getPosts, [col,val], (err, rows)=>{
      if (err){
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
      }else{
        return res.status(200).json({
          status: 200,
          success: true,
          post: rows,
        });
      }
    })
}

const retrieveByParamsPosts = (req,res)=>{
  const {col,val} = req.query;
  const retrievePosts = `SELECT * FROM post WHERE ?? LIKE ?`;
  const queryParams = [col, `%${val}%`];

  db.query(retrievePosts,queryParams, (err, rows) => {
    if (err) {
      // console.error('Error retrieving all records:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        post: rows,
      });
    }
  });
}

const updatePost = async (req, res) => {
  try {
    const { postID, val } = req.query;
    const sql = `UPDATE post SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE post_id = ?`;

    db.query(sql, [val, postID], (err, results) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          success: false,
          message: "Post update unsuccessful",  // Fixed typo here
          error: err.message,
        });
      } if (results.affectedRows === 0) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Post update unsuccessful',
          error: 'Record update failed',
        });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          message: "Successfully updated post",
          record: results,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Database Error",
      error: error.message,
    });
  }
};

const deletePost = (req, res) => {
  const { col, val } = req.query;

  const deletePostQuery = `DELETE FROM post WHERE ?? = ?`;

  db.query(deletePostQuery, [col, val], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 500, success: false, error: 'Error deleting record' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Post deleted successfully',
      });
    } else {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'Post not found',
      });
    }
  });
  };

module.exports = {
    createPost,
    retrieveAll,
    retrieveByParams,
    retrieveByParamsPosts,
    deletePost,
    updatePost,
}
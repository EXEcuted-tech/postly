require('dotenv').config()

const db = require('./a_db'); 

const likePost = (req, res) => {
    try {
      const {postID, reactID} = req.body
    const sql = `INSERT INTO reaction (post_id, reactor_id) VALUES (?, ?)`

      db.query(sql,[postID, reactID],(err,results) =>{
          if(err){
              res.status(500).json({
                  status: 500,
                  success: false,
                  message: "Like unsuccessful",
                  error: err.message
              })
          } else{
              res.status(200).json({
                  status: 200,
                  success: true,
                  message: "Successfully liked",
                  record: results
              })
          }
      })        
  } catch (error) {
      res.status(500).json({
          status: 500,
          success: false,
          message: "Database Error",
          error: error.message
      });
  }
  }

const retrieveLikesByParams = (req, res) => {
    const {col,val} = req.query

    const  getLikes = `SELECT * FROM reaction WHERE ?? = ? AND deleted_at IS NULL`

    db.query(getLikes, [col,val], (err, rows)=>{
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

const countLikes = (req, res) => {
    const {col, val} = req.query
    const  getLikes = `SELECT COUNT(*) AS count FROM reaction WHERE ?? = ? AND deleted_at IS NULL`

    db.query(getLikes, [col,val], (err, rows)=>{
        if (err){
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
        }else{
        return res.status(200).json({
            status: 200,
            success: true,
            post: rows,
        });
        }
    })
}

const retrieveByTwoParams = (req,res) =>{
    const { col1, val1, col2, val2} = req.query; 
    
    const retrieveSpecific = `SELECT * FROM reaction WHERE ?? = ? AND ?? = ?`;
    
    db.query(retrieveSpecific, [col1,val1,col2,val2],(err, row) => {
        if (err) {
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
        }else{
        return res.status(200).json({
            status: 200,
            success: true,
            records: row,
        });
        }
    });
}

const softDeleteLike = (req,res) =>{
    const {reaction_id} = req.query;
    const unfollowDate = new Date();
    const update = `UPDATE reaction SET deleted_at=?,updated_at=? WHERE reaction_id=?`

    db.query(update,[unfollowDate,unfollowDate,reaction_id],(err,result)=>{
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ status: 500, success:false,error: 'Error deleting like' });
            }
        
            if (result.affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                success: true,
                result: result,
            });
            } else {
            return res.status(500).json({ status: 500, success: false, error: 'Updating record like' });
            }
    });
}

const updateLike = (req,res) =>{
    const {reaction_id} = req.query;
    const updateDate = new Date();
    const update = `UPDATE reaction SET deleted_at=?,updated_at=? WHERE reaction_id=?`

    db.query(update,[null,updateDate,reaction_id],(err,result)=>{
        if (err) {
            return res.status(500).json({ status: 500, success:false,error: 'Error deleting follow' });
            }
        
            if (result.affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                success: true,
                result: result,
            });
            } else {
            return res.status(500).json({ status: 500, success: false, error: 'Updating record failed' });
            }
    });
}

const retrieveCountMonthlyLikes = (req, res) => {
    const { col, val } = req.query;
  
    const retrieveSpecific = `SELECT DATE_FORMAT(r.created_at, '%Y-%m') AS month, COUNT(*) AS count 
    FROM reaction r
    JOIN post p ON r.post_id = p.post_id
    WHERE ?? = ? AND r.deleted_at IS NULL AND YEAR(r.created_at) = YEAR(CURRENT_DATE)
    GROUP BY month 
    ORDER BY month`;
  
    db.query(retrieveSpecific, [col, val], (err, rows) => {
      if (err) {
        // console.error('Error retrieving records:', err);
        return res.status(500).json({ status: 500, success: false, error: 'Error retrieving records' });
      } else {
        return res.status(200).json({
          status: 200,
          success: true,
          monthlyCounts: rows,
        });
      }
    });
  }

  const retrieveTotalCount = (req, res) => {
    const { col, val } = req.query;
  
    const retrieveSpecific = `  SELECT COUNT(*) AS count
    FROM reaction r
    JOIN post p ON r.post_id = p.post_id
    WHERE ?? = ? AND r.deleted_at IS NULL`;
  
    db.query(retrieveSpecific, [col, val], (err, rows) => {
      if (err) {
        // console.error('Error retrieving records:', err);
        return res.status(500).json({ status: 500, success: false, error: 'Error retrieving records' });
      } else {
        return res.status(200).json({
          status: 200,
          success: true,
          count: rows,
        });
      }
    });
  }

  module.exports = {
    likePost,
    retrieveLikesByParams,
    countLikes,
    retrieveByTwoParams,
    softDeleteLike,
    updateLike,
    retrieveCountMonthlyLikes,
    retrieveTotalCount
}
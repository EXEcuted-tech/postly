const db = require('./a_db'); 

const createPost = (req,res) =>{
    const {account_id,content} = req.body;
    const insertQuery = 'INSERT into post (account_id,content) VALUES (?,?)';
    
    try{
       db.query(insertQuery,[account_id,content],(err,result)=>{
        if (err) {
            console.error('Error inserting data:', err);
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
        console.error('Error:', error);
        return res.status(500).json({ status: 500, success: false, error: 'An error occurred' });
    }
}

const retrieveAll = (req,res) => {
    const postRecs = 'SELECT * FROM post ORDER BY created_at DESC'

    db.query(postRecs, (err, rows) => {
      if (err) {
        console.error('Error retrieving all records:', err);
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
    const {col, val} = req.body

    const  getPosts = `SELECT * FROM post WHERE ?? = ?`

    db.query(getPosts, [col,val], (err, rows)=>{
      if (err){
        console.error('Error retrieving all records:', err);
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

module.exports = {
    createPost,
    retrieveAll,
    retrieveByParams
}
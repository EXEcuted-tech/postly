const db = require('./a_db'); 

const createFollow = (req,res) =>{
    const {account_id,follower_id} = req.body;
    const insertQuery = 'INSERT into account_follow (account_id,follower_id) VALUES (?,?)';
    
    try{
       db.query(insertQuery,[account_id,follower_id],(err,result)=>{
        if (err) {
            console.log('Error inserting data:', err);
            return res.status(500).json({ status: 500, success:false,error: 'Error inserting data' });
          }
      
          if (result.affectedRows > 0) {
            return res.status(200).json({
              status: 200,
              success: true,
              result: result,
            });
          } else {
            return res.status(400).json({ status: 400, success: false, error: 'Record insertion failed' });
          }
       })
    }catch{
        console.log('Error:', error);
        return res.status(500).json({ status: 500, success: false, error: 'An error occurred' });
    }
}

const retrieveByParams = (req,res) =>{
    const { col, val} = req.query; 
  
    const retrieveSpecific = `SELECT * FROM account_follow WHERE ?? = ? AND deleted_at IS NULL`;
  
    db.query(retrieveSpecific, [col,val],(err, row) => {
      if (err) {
        console.error('Error retrieving records:', err);
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

const retrieveCountByParams = (req,res) =>{
  const { col, val} = req.query; 

  const retrieveSpecific = `SELECT COUNT(*) AS count FROM account_follow WHERE ?? = ? AND deleted_at IS NULL`;

  db.query(retrieveSpecific, [col,val],(err, row) => {
    if (err) {
      console.error('Error retrieving records:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        count: row[0].count,
      });
    }
  });
}

const retrieveByTwoParams = (req,res) =>{
    const { col1, val1, col2, val2} = req.query; 
  
    const retrieveSpecific = `SELECT * FROM account_follow WHERE ?? = ? AND ?? = ?`;
  
    db.query(retrieveSpecific, [col1,val1,col2,val2],(err, row) => {
      if (err) {
        console.error('Error retrieving records:', err);
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

const updateFollow = (req,res) =>{
    const {follow_id} = req.query;
    const updateDate = new Date();
    const update = `UPDATE account_follow SET deleted_at=?,updated_at=? WHERE follow_id=?`

    db.query(update,[null,updateDate,follow_id],(err,result)=>{
        if (err) {
            console.error('Error updating data:', err);
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

const softDeleteFollow = (req,res) =>{
    const {follow_id} = req.query;
    const unfollowDate = new Date();
    const update = `UPDATE account_follow SET deleted_at=?,updated_at=? WHERE follow_id=?`

    db.query(update,[unfollowDate,unfollowDate,follow_id],(err,result)=>{
        if (err) {
            console.error('Error updating data:', err);
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

module.exports = {
    createFollow,
    updateFollow,
    softDeleteFollow,
    retrieveByParams,
    retrieveCountByParams,
    retrieveByTwoParams
}
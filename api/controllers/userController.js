const db = require('./a_db'); 
const saltRounds = 10;
const bcrypt = require('bcrypt');

const updateUser = async (req,res)=>{
    try {
        const {userID} = req.query
        const userUpdate = req.body

        const cols = Object.keys(userUpdate)
        const values = Object.values(userUpdate);

        if (userUpdate.password) {
          const hashedpassword = await bcrypt.hash(userUpdate.password, saltRounds);
          const passwdIndex = cols.indexOf("password");
    
          if (passwdIndex !== -1) {
            values[passwdIndex] = hashedpassword;
          }
        } 

      const setClause = cols.map((col) => `${col} = ?`).join(', ')

      const sql = `UPDATE account SET ${setClause} WHERE account_id = ?`

        db.query(sql,[...values,userID],(err,results) =>{
            if(err){
                // console.error('Error Getting data:', err)
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Account udpate unsuccessful",
                    error: err.message
                })
            } else{
                res.status(200).json({
                    status: 200,
                    success: true,
                    message: "Successfully updated account",
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

const retrieveByParams = (req,res)=>{
    const {col, val} = req.query; 

    const retrieveSpecific = `SELECT * FROM account WHERE ?? = ?`;

    db.query(retrieveSpecific, [col,val],(err, row) => {
        if (err) {
        // console.error('Error retrieving records:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
        }else{
        return res.status(200).json({
            status: 200,
            success: true,
            user: row,
        });
        }
    });
}   

const retrieveByParamsLike = (req,res)=>{
    const {col1,col2,value} = req.query;
    const retrieveUsers = `SELECT * FROM account WHERE ?? LIKE ? OR ?? LIKE ?`;
    const queryParams = [col1, `%${value}%`, col2, `%${value}%`];
    //console.log(queryParams);
    db.query(retrieveUsers,queryParams, (err, rows) => {
      //console.log('SQL Query:', retrieveTasks, queryParams);
      if (err) {
        //console.error('Error retrieving all records:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
      }else{
        //console.log(rows);
        return res.status(200).json({
          status: 200,
          success: true,
          user: rows,
        });
      }
    });
  }

const retrieveAll = (req,res)=>{   
const {col,val,order} = req.query;

const retrieveTasks = `SELECT * FROM account`

db.query(retrieveTasks, (err, rows) => {
    if (err) {
    // console.error('Error retrieving all records:', err);
    return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
    }else{
    return res.status(200).json({
        status: 200,
        success: true,
        tasks: rows,
    });
    }
});
}

module.exports = {
    updateUser,
    retrieveByParams,
    retrieveByParamsLike,
    retrieveAll,
}
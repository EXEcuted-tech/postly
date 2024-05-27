const db = require('./a_db'); 

const getAllNotifications = async (req, res) => {
    const {userID} = req.query

    const getNotifs = 'SELECT * FROM notification WHERE account_id = ? ORDER BY created_at DESC'

    db.query(getNotifs, [userID], (err, rows) => {
        if (err) {
            console.error('Error retrieving all records:', err);
            return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
          }else{
            return res.status(200).json({
              status: 200,
              success: true,
              notif: rows,
            });
          }
    })
} 

module.exports = {getAllNotifications};
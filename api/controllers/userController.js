const db = require('./a_db'); 

const retrieveByParams = (req,res)=>{
    const {col, val} = req.query; 

    const retrieveSpecific = `SELECT * FROM account WHERE ?? = ?`;

    db.query(retrieveSpecific, [col,val],(err, row) => {
        if (err) {
        console.error('Error retrieving records:', err);
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

module.exports = {
    retrieveByParams
}
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

function containsSQLKeywords(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (containsSQLKeywords(obj[key])) {
          return true;
        }
      } else if (typeof obj[key] === 'string' && /INSERT|DELETE/i.test(obj[key])) {
        return true;
      }
    }
    return false;
  }

const editUserValidator = (req, res, next) => {
    const { userID } = req.query;
    const { name } = req.body;

    let error = "";

    if (!userID || isNaN(userID)) {
        error = 'User ID is required and must be a number!';
    }

    if (name !== undefined && (typeof name !== 'string' || name.length < 1)) {
        error = 'Name must be a non-empty string if provided!';
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

const searchLikeUserValidator = (req, res, next) =>{
    if (req.query){
        const {col2,val2} = req.query;
        const queryParams = {col2,val2};
        if (containsSQLKeywords(queryParams)) {
            // Handle the case where SQL keywords are detected
            console.error('SQL keywords detected in the query parameters');
            return res.status(400).json({status: 400, success: false, message: 'Invalid Input! Malformed'})
          } else {
            if(val2 === null || val2 === undefined){
                return res.status(400).json({status: 400, success: false, message: 'Invalid Input! Cannot be NULL'})
            }
            else{
                if (val2.length <= 100){ //100 character limit
                    next();
                }else{
                    console.error('Character Limit Reached');
                    return res.status(400).json({status: 400, success: false, message: 'Invalid Input! Character Limit Reached'})
                }
                
            }
          }
    }else{
        console.error('Invalid Request, Cannot be Empty');
        return res.status(400).json({status: 400, success: false, message: 'Invalid Input! Cannot be NULL'})
    }
}


module.exports = {editUserValidator, searchLikeUserValidator};
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
    const { name, password} = req.body;

    let error = "";

    if (!userID || isNaN(userID)) {
        error = 'User ID is required and must be a number!';
    }

    if (name !== undefined && (typeof name !== 'string' || name.length < 1)) {
        error = 'Name must be inputted!';
    }

    if (password !== undefined && (typeof password !== 'string' || password.length < 8)) {
        error = 'Password must be a string with at least 8 characters long!';
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
    let error = "";

    if (req.query){
        const {col1,col2,value} = req.query;
        const queryParams = {col1,col2,value};
        if (containsSQLKeywords(queryParams)) {
            error='Invalid Input! Malformed.'
          } else {
            if(value === null || value === undefined){
                error='Invalid Input! Search cannot be empty.'
            }
            else{
                if (value.length >= 100){ //100 character limit
                  error= 'Invalid Input! 100 character limit reached.'
                }
            }
          }
    }else{
        error='Invalid Input! Search cannot be empty.'
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


module.exports = {editUserValidator, searchLikeUserValidator};
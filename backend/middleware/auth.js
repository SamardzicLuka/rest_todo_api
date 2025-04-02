const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;
if(!secret_key){
    throw new Error('No secret key defined');
}

const authenticateUser = async (req,res,next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({error: "Access denied. No token provided"});
    }

    try {
        //authorization headers are in the following format:
        // <Authorization: <type> <credentials> in this case it will be 
        // Bearer <my_token>, so we will format the string accordingly

        const decodedToken = jwt.verify(token.replace('Bearer ', ''),secret_key);
        req.user = decodedToken;
        next();

    } catch (error) {
       res.status(400).json({error: "Invalid token", details: error.message});
    }
};

module.exports = authenticateUser;

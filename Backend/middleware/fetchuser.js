const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const jwtSecret = 'A$adraza@2008';


const fetchuser = (req,res,next) =>
{
    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(401).send({error : "Please authenticate using valid token"});
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        
        return res.status(401).send({error : "Please authenticate using valid token"});
    }
}

module.exports = fetchuser;
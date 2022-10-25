const admin = require("../firebase");

exports.authCheck = (req,res,next) =>{
    try{
        const email = req.headers.email;
        const password = req.headers.password;
        req.credential = {
            email,password 
        }
        next();
    }
    catch(err)
    {
        res.status(401).json({err:"Invalid Request"});
    }
}
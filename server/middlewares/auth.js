const admin = require("../firebase");




exports.authCheck = (req,res,next) =>{


    console.log(req.body);
    try{
        const email = req.body.email;
        const password = req.body.password;
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
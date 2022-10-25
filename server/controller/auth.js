const User = require('../models/user');

exports.login=(req,res)=>{
    
    const {email,password} = req.credential;

    User.countDocuments({email,password}, function (err, count){ 
        if(count>0){
                res.status(200).json({err: "Login Successfully"});
        }
        else{
            res.status(401).json({err: "Wrong Credentials"});
        }
    });
}

exports.signup=(req,res)=>{
    
    const {email,password} = req.credential;

    User.countDocuments({email}, function (err, count){ 
        if(count>0){
                res.status(200).json({err: "Please Login"}); 
        }
        else{
          const user = new User({
              email,password
          });
          user.save(function(err,result){
            res.status(200).json({result});
          });
        }
    });

}
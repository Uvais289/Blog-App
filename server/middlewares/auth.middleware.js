const jwt= require("jsonwebtoken");

function authCheck(req,res,next){
    const cookies= req.cookies;
    const accessToken= cookies["blog-access-token"];
    if(accessToken){
        const isTokenValid= jwt.verify(accessToken,process.env.JWT_SECRET_KEY);
        if(isTokenValid){
            req.body.userId= isTokenValid.userId;
            next();
        }else{
            res.send({message:"Please login again!"});
        }
    }
}

module.exports= authCheck;
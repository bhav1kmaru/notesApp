const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token=req.query.token
    if(token){
        jwt.verify(token,"shhhhh",(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send({message:"Please Login 1"})
            }
        })
    }else{
        res.send({message:"Please Login 2"})
    }
}

module.exports={authenticate}